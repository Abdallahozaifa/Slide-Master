/**
* Creates a lecture object
* @function
* @param {string} lecID - The lecture ID.
* @param {string} lecTitle - The lecture title.
* @param {string} courseTitle - The course title.
* @param {string} instructor - The instructor.
* @param {object} page - The page object that contains lecID, pageID, pageSeq, pageAudioURL,
* entity object, and my notes.
*/
var Lecture = function(lecID, lecTitle, courseTitle, instructor, page){
    return { 
        lecID: "",
        lecTitle: "",
        courseTitle: "",
        instructor: "",
        pages: {
            lecID: "",
            pageID: "",
            pageSeq: "",
            pageAudioURL: "",
            entity: {
                lecID: "",
                pageID: "",
                entID: "",
                entType: "",
                entLoc: "",
                entCont: "",
                entAnim: ""
            },
            myNotes: ""
        }
    };
};

/**
* Creates a page object
* @function
* @param {string} lecID - The lecture ID.
* @param {string} pageID - The page id.
* @param {string} pageSeq - The page sequence.
* @param {string} pageAudioURL - The audio url link.
* @param {object} entity - The entity object that contains lecID, pageID, entID, entType, entLoc, entCont, entAnim
* @param {string} myNotes - The notes on the page
*/
var Page = function(lecID, pageID,pageSeq, pageAudioURL, entity, myNotes){
  return {
    lecID: "",
    pageID: "",
    pageSeq: "",
    pageAudioURL: "",
    entity: {
        lecID: "",
        pageID: "",
        entID: "",
        entType: "",
        entLoc: "",
        entCont: "",
        entAnim: ""
    },
    myNotes: "" 
  };  
};

/**
* Creates a entity object
* @function
* @param {string} lecID - The lecture ID.
* @param {string} pageID - The page id.
* @param {string} entID - The entity id.
* @param {string} entType - The entity type .
* @param {string} entLoc - The entity location
* @param {string} entCont - The entity content
* @param {string} entAnim - The entity animation
*/
var Entity = function(lecID, pageID, entID, entType, entLoc, entCont, entAnim){
  return {
    lecID: "",
    pageID: "",
    entID: "",
    entType: "",
    entLoc: "",
    entCont: "",
    entAnim: "" 
  }; 
};


/* How to create the lecture object 
    var entity = new Entity(lecID, pageID, entID, entType, entLoc, entCont, entAnim);
    var page  = new Page(lecID, pageID,pageSeq, pageAudioURL, entity, myNotes);
    var lecture = new Lecture(lecID, lecTitle, courseTitle, instructor, page);
*/