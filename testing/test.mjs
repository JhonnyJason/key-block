import * as blocker from "../output/index.js"



//==========================================================================
//#region all Test Function
//==========================================================================
async function testBlockOrThrow(key = "testBlockOrThrow") {
    blocker.setBlockingTimeMS(1000)

    // initial blockOrThrow
    try {
        blocker.blockOrThrow(key)    
    } catch(error) {
        throw new Error("Unexpected error on initial blockOrThrow: "+error.message)
    }

    // first blocked blockOrThrow
    try {
        blocker.blockOrThrow(key)    
        throw new Error("Unexpectedly no error thrown on first blocked blockOrThrow!")
    } catch(error) { 
        if(error.message != "Key "+key+" is blocked!") {
            throw new Error("Unexpectedly, error thrown on first blocked blockOrThrow was wrong! Thrown error is: "+error.message)
        }
    }

    await waitMS(1200)

    // unblocked blockOrThrow
    try {
        blocker.blockOrThrow(key)    
    } catch(error) {
        throw new Error("Unexpected error on unblocked blockOrThrow: "+error.message)
    }

    // second blocked blockOrThrow
    try {
        blocker.blockOrThrow(key)    
        throw new Error("Unexpectedly no error thrown on second blocked blockOrThrow!")
    } catch(error) { 
        if(error.message != "Key "+key+" is blocked!") {
            throw new Error("Unexpectedly, error thrown on second blocked blockOrThrow was wrong! Thrown error is: "+error.message)
        }
    }

}

//==========================================================================
async function testPassOrThrow(key = "testPassOrThrow") {

    // initial passOrThrow
    try {
        blocker.passOrThrow(key)    
    } catch(error) {
        throw new Error("Unexpected error on initial passOrThrow: "+error.message)
    }
    
    // initial blockOrThrow
    try {
        blocker.blockOrThrow(key)    
    } catch(error) {
        throw new Error("Unexpected error on initial blockOrThrow: "+error.message)
    }

    // blocked passOrThrow
    try {
        blocker.passOrThrow(key)    
        throw new Error("Unexpectedly no error thrown on blocked passOrThrow!")
    } catch(error) { 
        if(error.message != "Key "+key+" is blocked!") {
            throw new Error("Unexpectedly, error thrown on blocked passOrThrow was wrong! Thrown error is: "+error.message)
        }
    }
    
}

//==========================================================================
async function testIsBlocked(key = "testIsBlocked") {

    // initial isBlocked
    if(blocker.isBlocked(key)) {
        throw new Error("Unexpectedly, initial isBlocked is true!")
    }

    // initial blockOrThrow
    try {
        blocker.blockOrThrow(key)    
    } catch(error) {
        throw new Error("Unexpected error on initial blockOrThrow: "+error.message)
    }
    
    // blocked isBlocked
    if(!blocker.isBlocked(key)) {
        throw new Error("Unexpectedly, blocked isBlocked is false!")
    }

}

//==========================================================================
//#endregion
//==========================================================================


//==========================================================================
// run Tests Function
//==========================================================================
async function run() {

    try{
        await testBlockOrThrow()
        console.log("success: testBlockOrThrow")
    } catch(error) {
        console.log("! fail: testBlockOrThrow\nerror> "+error.message+"\n\n")
    }
    
    try{
        await testPassOrThrow()
        console.log("success: testPassOrThrow")
    } catch(error) {
        console.log("! fail: testPassOrThrow\nerror> "+error.message+"\n\n")
    }

    try{
        await testIsBlocked()
        console.log("success: testIsBlocked")
    } catch(error) {
        console.log("! fail: testIsBlocked\nerror> "+error.message+"\n\n")
    }

}

//==========================================================================
// helper functions
//==========================================================================
async function waitMS(ms) {
    await  new Promise((resolve) => setTimeout(resolve, ms))
}

run()