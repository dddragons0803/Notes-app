// get / , homepage

exports.homepage = async(req,res)=>{
    const locals = {
        title:"NodeJs Notes",
        description:"Freee Notes taking app"
    }
    res.render('index',{
        locals,
        layout:'../views/layouts/front-page'
        // layout instead of layouts
    })
// used to render an EJS template named 'index'(in views) while passing a locals object to the template for rendering dynamic data within the template.

}

exports.about = async(req,res)=>{
    const locals = {
        title: " About NodeJs Notes",
        description:"Freee Notes taking app"
    }
    res.render('about',locals)

}