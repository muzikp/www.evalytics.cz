module.exports = async function(fileName, engine) {
    /* triggered when a file team.pug in /lab/templates subdirectory is changed/saved */
    if(fileName == "templates/team.pug") {
        const locals = engine.getLocals();
        for(let person in locals.teams) {
            var html = engine.compilePug(fileName, {person: person}, `/team/${person.url}.html`)
        }
        return true; /* prevents default compile behaviour; set to false if compilation should be run anyway */
    }    
    else {
        return false;
    }

}