export default class Stars {
    constructor(ctx, width, height, amount) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.stars = this.getStars(amount)
        this.color = "white"
    }

    getStars(amount) {
        let stars = []
        
        while (amount--) {
            stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() + 0.2,
                color:'#white'
            })
        }
        return stars
    }

    draw() {
        let ctx = this.ctx
        ctx.save() //  保存canvas
        
        this.stars.forEach(star=> {
            ctx.fillStyle = star.color
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
            ctx.fill()
        })
        ctx.restore() // 撤销上次canvas
    }

    //闪烁，星星半径每隔10帧随机变大或变小
    blink() {
        this.stars = this.stars.map(star=> {
            let color = Math.random() > 0.5 ? '#333' : 'white'
            star.color = color
            return star
        })

    }
}