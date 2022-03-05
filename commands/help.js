function helpfn(){ // ` instead of ' for multiline console.log
    console.log(`List of all the commands-
                    1) Tree command - node FO.js tree <dirname>
                    2) Organize Command - node FO.js organise <dirname>
                    3) help Command - node FO.js help`)

}

module.exports={
    helpKey : helpfn
}