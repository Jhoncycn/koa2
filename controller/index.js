module.exports = {
    index: async (ctx, next) => {
    	await ctx.render('index', {
	    title:'首页',
	    name:'jhoncy'
	  });
    }
}