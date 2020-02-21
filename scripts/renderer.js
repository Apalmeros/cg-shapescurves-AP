class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer)
	{
		this.drawRectangle(200, 250, 500, 400, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer)
	{
		this.drawCircle(400, 300, 250, [255, 0, 0, 255], framebuffer);
		//this.drawLine(50, 100, 300, 250, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer)
	{
		if (show_points == true)
		{
			this.drawBezierCurve(this.pt0 = {x: 100, y: 100}, this.pt1 = {x: 150, y: 200}, this.pt2 = {x: 250, y: 300}, this.pt3 = {x: 350, y: 100}, [255, 0, 0, 255], framebuffer);
			this.drawCircle(this.pt0.x, this.pt0.y, 10, [255, 0, 0, 255], framebuffer);
		}
		else
		{
			this.drawBezierCurve(this.pt0 = {x: 100, y: 100}, this.pt1 = {x: 150, y: 200}, this.pt2 = {x: 250, y: 300}, this.pt3 = {x: 350, y: 100}, [255, 0, 0, 255], framebuffer);
		}
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer)
	{
		var color3 = [5, 70, 250, 255];
		this.drawLine(50, 50, 100, 300, color3, framebuffer);
		this.drawLine(100, 300, 200, 50, color3, framebuffer);
		this.drawLine(50, 100, 200, 100, color3, framebuffer);
		
		this.drawBezierCurve(this.pt0 = {x: 200, y: 50}, this.pt1 = {x: 200, y: 200}, this.pt2 = {x: 250, y: 200}, this.pt3 = {x: 350, y: 10}, color3, framebuffer);
		
		this.drawLine(330, 50, 330, 300, color3, framebuffer);
		this.drawLine(250, 200, 400, 200, color3, framebuffer);
		
		this.drawCircle(400, 125, 60, color3, framebuffer);
		
		this.drawBezierCurve(this.pt0 = {x: 450, y: 50}, this.pt1 = {x: 500, y: 200}, this.pt2 = {x: 525, y: 150}, this.pt3 = {x: 550, y: 10}, color3, framebuffer);
		
		this.drawLine(575, 50, 575, 200, color3, framebuffer);
		this.drawCircle(575, 220, 10, color3, framebuffer);
		
		this.drawCircle(650, 125, 60, color3, framebuffer);
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawRectangle(LBx, LBy, RTx, RTy, color, framebuffer)
	{
		var right_bottom;
		var left_top;
		
		right_bottom = ({x: RTx, y: LBy});
		left_top = ({x: LBx, y: RTy});
		
		if (this.show_points == true)
		{
			this.drawLine(LBx, LBy, right_bottom.x, right_bottom.y, color, framebuffer);
			this.drawLine(right_bottom.x, right_bottom.y, RTx, RTy, color, framebuffer);
			this.drawLine(RTx, RTy, left_top.x, left_top.y, color, framebuffer);
			this.drawLine(left_top.x, left_top.y, LBx, LBy, color, framebuffer);
			this.drawCircle(LBx, LBy, 10, [255, 0, 0, 255], framebuffer);
			this.drawCircle(right_bottom.x, right_bottom.y, 10, [255, 0, 0, 255], framebuffer);
			this.drawCircle(left_top.x, left_top.y, 10, [255, 0, 0, 255], framebuffer);
			this.drawCircle(RTx, RTy, 10, [255, 0, 0, 255], framebuffer);
		}
		else
		{
			this.drawLine(LBx, LBy, right_bottom.x, right_bottom.y, color, framebuffer);
			this.drawLine(right_bottom.x, right_bottom.y, RTx, RTy, color, framebuffer);
			this.drawLine(RTx, RTy, left_top.x, left_top.y, color, framebuffer);
			this.drawLine(left_top.x, left_top.y, LBx, LBy, color, framebuffer);
		}
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(Cx, Cy, radius, color, framebuffer)
	{
		var coordinates = [];
		var sides = this.num_curve_sections;
		var i;
		for (i=0; i< sides; i++)
		{
			var angle = (i / sides) * 2 * Math.PI;
			var x = Cx + radius * Math.cos(angle);
			var y = Cy + radius * Math.sin(angle);
			
			coordinates.push({x, y});
		}
		console.log(coordinates);

		for (i=0; i<coordinates.length; i++)
		{
			var x0 = parseInt(coordinates[i].x);
			var y0 = parseInt(coordinates[i].y);
			var x1, y1;
			
			if (i == coordinates.length-1)
			{
				 x1 = parseInt(coordinates[0].x);
				 y1 = parseInt(coordinates[0].y);
			}
			else
			{
				x1 = parseInt(coordinates[i+1].x);
				y1 = parseInt(coordinates[i+1].y);
			}
			
			this.drawLine(x0, y0, x1, y1, color, framebuffer);
		}
		if (this.show_points == true)
		{
			var color1 = [200, 249, 5, 255];
			for(i=0; i<coordinates.length; i++)
			{
				var x00 = parseInt(coordinates[i].x);
				var y00 = parseInt(coordinates[i].y);
				this.drawLine(Cx, Cy, x00, y00, color1, framebuffer);
			}
		}
		
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer)
	{
		var points = [];
		var i;
		var lines = 1 / this.num_curve_sections;
        var cX = 3 * (pt1.x - pt0.x),
			bX = 3 * (pt2.x - pt1.x) - cX,
			aX = pt3.x - pt0.x - cX - bX;
			
		var cY = 3 * (pt1.y - pt0.y),
			bY = 3 * (pt2.y - pt1.y) - cY,
			aY = pt3.y - pt0.y - cY - bY;
		
		for (i=0; i<1 ; i+=lines)
		{
			var x = (aX * Math.pow(i,3)) + (bX * Math.pow(i,2)) + (cX * i) + pt0.x;
			var y = (aY * Math.pow(i,3)) + (bY * Math.pow(i,2)) + (cY * i) + pt0.y;
			points.push({x, y});
		}
		console.log(points);
		
		for (i=0; i<points.length; i++)
		{
			var x0 = parseInt(points[i].x);
			var y0 = parseInt(points[i].y);
				
			var x1, y1;
				
			if (i == points.length - 1)
			{
				x1 = parseInt(points[points.length-1].x);
				y1 = parseInt(points[points.length-1].y);
			}
			else
			{
				x1 = parseInt(points[i+1].x);
				y1 = parseInt(points[i+1].y);
			}
			this.drawLine(x0, y0, x1, y1, color, framebuffer);
		}
		if (this.show_points == true)
		{
			var color2 = [5, 30, 121, 255];
			for (i=0; i<points.length; i++)
			{
				var x0 = parseInt(points[i].x);
				var y0 = parseInt(points[i].y);
				this.drawCircle(x0, y0, 4, color2, framebuffer); 
			}
		}
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawLine(x0, y0, x1, y1, color, framebuffer)
    {
        // code from class here
		if (Math.abs(y1 - y0) <= Math.abs(x1 - x0)) // |m| <= 1
		{
			if (x0 < x1)
			{
				this.drawLineLow(x0, y0, x1, y1, color, framebuffer);
			}
			else
			{
				this.drawLineLow(x1, y1, x0, y0, color, framebuffer);
			}
		}
		else
		{
			if (y0 < y1)
			{
				this.drawLineHigh(x0, y0, x1, y1, color, framebuffer);
			}
			else
			{
				this.drawLineHigh(x1, y1, x0, y0, color, framebuffer);
			}
		}		
	}
	
	drawLineLow(x0, y0, x1, y1, color, framebuffer)
	{
		var A = y1 - y0;
		var B = x0 - x1;
		var iy = 1;
		if (A < 0)
		{
			iy = -1;
			A *= -1;
		}
		var D = 2 * A + B;
		var x = x0;
		var y = y0;
		var px;
		while (x <= x1)
		{
			px = this.pixelIndex(x, y, framebuffer);
			this.setFramebufferColor(framebuffer, px, color);
			x += 1;
			if (D <= 0)
			{
				D += 2 * A;
			}
			else
			{
				D += 2 * A + 2 * B;
				y += iy;
			}
		}
	}
	
	drawLineHigh(x0, y0, x1, y1, color, framebuffer)
	{
		var A = x1 - x0;
		var B = y0 - y1;
		var ix = 1;
		if (A < 0)
		{
			ix = -1;
			A *= -1;
		}
		var D = 2 * A + B;
		var x = x0;
		var y = y0;
		var px;
		while (y <= y1)
		{
			px = this.pixelIndex(x, y, framebuffer);
			this.setFramebufferColor(framebuffer, px, color);
			y += 1;
			if (D <= 0)
			{
				D += 2 * A;
			}
			else
			{
				D += 2 * A + 2 * B;
				x += ix;
			}
		}
	}
	
	pixelIndex(x, y, framebuffer)
	{
		return 4 * y * framebuffer.width + 4 * x;
	}
	
	setFramebufferColor(framebuffer, px, color)
	{
		framebuffer.data[px + 0] = color[0];
		framebuffer.data[px + 1] = color[1];
		framebuffer.data[px + 2] = color[2];
		framebuffer.data[px + 3] = color[3];
	}
};
