export class Episode {
    constructor(m, lw, lc, pts, id) {
        this.mountain = m;
        this.lineWeight = lw;
        this.lineColor = lc;
        this.points = pts;
        this.identity = id;
    }

    render(svg) {
        const contourCurve = d3.line().curve(d3.curveBasisClosed);

        svg
        .append('path')
        .attr("id", this.identity)
        .on("click", function () {
            console.log("Clicked on contour #".concat(e.toString()));
            animateSelection(this.id);
            selectedId = this.id;
        })
        .attr('d', contourCurve(this.points))
        .attr("stroke-linejoin", "round")
        .attr("fill", "black")
        .attr("stroke", this.lineColor)
        .attr("stroke-width", this.lineWeight);
    }
}