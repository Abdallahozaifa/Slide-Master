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
        page: {
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

/* Creation of a lecture with the proper parameters */
var lec = new Lecture(lecID, lecTitle, courseTitle, instructor, page);