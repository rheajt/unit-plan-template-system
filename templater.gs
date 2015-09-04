function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
    .addItem('Start', 'showWindow')
    .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showWindow() {
  var ui = HtmlService.createTemplateFromFile('window')
    .evaluate()
    .setWidth(1000)
    .setHeight(600)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
  DocumentApp.getUi().showModalDialog(ui, 'UBD Template Creator');
}

function getObjectives(lvl) {
  return objectiveList[lvl];
}

function createDocument(d) {
  var body = DocumentApp.getActiveDocument().getBody();

  //create two variables for the data split
  var goals = [
    ["Reading Fiction"],
    ["Reading Non-Fiction"],
    ["Writing"],
    ["Listening"],
    ["Speaking"],
    ["Grammar"]
  ];
  var swbat = [];
  
  //split the data from the objectives array and
  for(i = 0; i < 6; i++) {
    if(d.objectivesArray[i] !== null) {
      for(k = 0; k < d.objectivesArray[i].length; k++) {
        goals[i].push(d.objectivesArray[i][k].split('_')[0]);
        swbat.push(d.objectivesArray[i][k].split('_')[1]);
      }
    }
  }
  
  // Start writing the document
  // Append a document header paragraph.
  body.appendParagraph("IZMIR SEV ELEMENTARY SCHOOL\nUBD UNIT PLAN")
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  
  // Append a section header paragraph.
  body.appendParagraph("Grade Level: ")
    .appendText("Grade " + d.level)
    .appendText("\rClass: English")
    .appendText("\rDates: "+ d.startDate + " until " + d.endDate)
    .appendText("\rUnit Name: "+ d.title);
   
  body.appendHorizontalRule();
  
  //Start Stage 1
  body.appendParagraph("STAGE 1: Desired Outcome")
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  body.appendParagraph("Established Goals:\r").setBold(true);

  for(i = 0; i < goals.length; i++) {
    if(goals[i].length > 1) {
      body.appendListItem(goals[i][0])
        .setBold(false)
        .setGlyphType(DocumentApp.GlyphType.SQUARE_BULLET);
    
      for(l = 1; l < goals[i].length; l++) {
        body.appendListItem(goals[i][l])
          .setNestingLevel(1)
          .setGlyphType(DocumentApp.GlyphType.BULLET);
      }
    }
  }
  
  var essentials = body.appendParagraph("Essential Questions:\r").setBold(true);
  if(d.objectivesArray[6] !== null) {
    for(i = 0; i < d.objectivesArray[6].length; i++) {
      essentials.appendText(d.objectivesArray[6][i] + "\r").setBold(false);
    }
  }
  
  var understandings = body.appendParagraph("Understandings:\r").setBold(true);
  understandings.appendText("\rStudents will know...\r").setItalic(true).setBold(false);
  if(d.objectivesArray[6] !== null) {
    for(i = 0; i < d.objectivesArray[7].length; i++) {
      understandings.appendText(d.objectivesArray[7][i] + "\r").setBold(false).setItalic(false);
    }
  }
  
  understandings.appendText("\rStudents will understand...\r").setItalic(true);
  if(d.objectivesArray[6] !== null) {
    for(i = 0; i < d.objectivesArray[8].length; i++) {
      understandings.appendText(d.objectivesArray[8][i] + "\r").setItalic(false);
    }
  }
  
  understandings.appendText("\rStudents will be able to...\r").setItalic(true);
  if(d.objectivesArray[6] !== null) {
    for(i = 0; i < swbat.length; i++) {
      understandings.appendText(swbat[i] + "\r").setItalic(false);
    }
  }
  
  body.appendHorizontalRule();
  
  //Stage 2
  
  body.appendParagraph("STAGE 2: Assessment Evidence")
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
  body.appendParagraph("Performance Tasks/Other Evidence:\r").setBold(true);
  if(d.tasks !== null) {
    for(i = 0; i < d.tasks.length; i++) {
      body.appendListItem(d.tasks[i]).setBold(false);
    }
  }
  
  body.appendHorizontalRule();  
  
  
  //Stage 3
  var table = [];
  
  for(i = 1 ; i <= d.lessons; i++) {
    table.push(["Lesson " + i, ""]);
  }
  
  body.appendParagraph("STAGE 3: Learning Plan")
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  
  if(d.lessons >= 0) {
    var lessons = body.appendTable(table);
    lessons.getCell(0,0).setWidth(65);
  }
  
}// end of the createDocument function


//object filled with grade level objectives based on common core standards
var objectiveList = {
  "5": {
      "fiction": [
          ["Drawing inferences from fiction", "...refer to details and examples in a text when explaining explicit details from a text. (RL.4.1)"],
          ["Theme", "...use details from a text to determine theme of a story, drama, or poem (RL.4.2) "],
          ["Summarize text", "...use their own words to summarize a story, drama, or poem (RL.4.2)"],
          ["Story elements - character, setting, events", "...describe in depth a character, setting, or event in a story or drama (RL.4.3)"],
          ["Story elements - specific details", "...draw on specific details in the text (RL.4.3)"],
          ["Story elements - poetry, prose, drama", "...identify differences between poetry, prose, and drama (RL.4.5)"],
          ["Context", "...determine the meaning of words and phrases as they are used in a text (RL.4.4)"],
          ["Compare and contrast - point of view", "...identify the difference between the point of view in different stories (RL.4.6)"],
          ["Compare and contrast - first/third person", "...differences between first- and third- person narration (RL.4.6)"],
          ["Compare and contrast - themes and patterns", "...the treatment of similar themes and patterns of events (RL.4.9)"],
          ["Compare and contrast - text and visuals", "...make connections between a text and its visual representation (RL.4.8)"]
        ],
      "nonfiction": [
          ["Drawing inferences from non-fiction", "...refer to details and examples when explaining a text (RI.4.1)"],
          ["Main idea - determine and explain", "...determine the main idea and explain how it is supported with key details (RI.4.2)"],
          ["Main idea - historical text", "...explain events in a historical text using specific information (RI.4.3)"],
          ["Main idea - interpretation strategies", "...use interpretation strategies to read for main idea"],
          ["Main idea - relevant information", "...extract relevant information from short texts"],
          ["Context clues", "...determine meaning of academic specific words or phrases in a text (RI.4.4)"],
          ["Text structure - describe the structure", "...describe the structure of a text (RI.4.5)"],
          ["Text structure - visuals and graphics", "...interpret information represented visually (RI.4.7)"],
          ["Compare and contrast - firsthand/secondhand accounts", "...describe similarities/differences between a firsthand and secondhand account of the same event (RI.4.6)"],
          ["Compare and contrast - two texts", "...use information from two texts to write about the subject (RI.4.9)"],
          ["Author’s purpose", "...explain how an author uses reason and evidence (RI.4.8)"]
        ],
      "writing": [
          ["Writing for a purpose - opinion", "...write an opinion piece with supporting reasons and information (W.4.1)"],
          ["Writing for a purpose - intro a topic", "...introduce a topic, state an opinion, and clearly structure a piece of writing (W.4.1.A)"],
          ["Writing for a purpose - supporting facts", "...support using facts and details (W.4.1.B)"],
          ["Writing for a purpose - link opinions", "...link opinions using specific words and phrases (W.4.1.C)"],
          ["Writing for a purpose - write conclusion", "...write a conclusion statement (W.4.1.D)"],
          ["Writing for a purpose - write info text", "...write an informative/explanatory text on a topic (W.4.2)"],
          ["Writing for a purpose - structure", "...introduce a topic with appropriate structure and formatting (W.4.2.A)"],
          ["Writing for a purpose - facts, details, quotations", "...develop a topic with facts, concrete details, and quotations (W.4.2.B)"],
          ["Writing for a purpose - link ideas", "...link ideas using specific words and phrases (W.4.2.C)"],
          ["Writing for a purpose - concluding statement", "...provide a concluding statement (W.4.2.E)"],
          ["Writing for a purpose - write a narrative", "...write a narrative, developing experiences with descriptive details and clear event sequences (W.4.3)"],
          ["Writing for a purpose - situation, narrator, purpose", "...establish a situation, narrator, and characters (W.4.3.A)"],
          ["Writing for a purpose - sequencing events", "...organize an event sequence that unfolds naturally (W.4.3.A)"],
          ["Writing for a purpose - character dialogue", "...use dialogue to show characters responses to situations (W.4.3.B)"],
          ["Writing for a purpose - transition words", "...use transitional words and phrases to show the sequence of events (W.4.3.C)"],
          ["Writing for a purpose - descriptive words", "...use descriptive words and phrases to convey details (W.4.3.D)"],
          ["Writing for a purpose - conclude narrated events", "...create a conclusion that follows the narrated events (W.4.3.E)"],
          ["Writing for a purpose - written message", "...communicate a written message of an authentic type which includes specific information"],
          ["Writing process - coherent writing", "...produce coherent writing with appropriate task, purpose, and audience (W.4.4)"],
          ["Writing process - plan, revise, edit", "...plan, revise, and edit a piece of writing (W.4.5)"],
          ["Writing process using technology", "...use technology to produce a piece of writing to a minimum of one page in a single sitting (W.4.6)"],
          ["Research a topic", "...conduct a short research project by investigating different aspects of a topic (W.4.7)"],
          ["Research print/digital sources", "...gather relevant information from both print and digital sources (W.4.8)"],
          ["Research organize/collect info", "...organize notes, categorize information, and provide a list of sources for that information (W.4.8)"],
          ["Research supporting evidence", "...draw evidence from texts (both literary and informational) to support research (W.4.9)"]
      ],
    "speaking": [
          ["Discussion and Performance", "...read/speak out loud at a typical/average speaking rate"],
          ["Discussion and Performance", "...read/speak using emotion and intonation"],
          ["Discussion and Performance", "...read/speak clearly and articulately so as to be understood by listeners"],
          ["Discussion and Performance", "...speak within the confines of agreed upon roles/rules for performances and discussions"],
          ["Discussion and Performance", "...speak appropriately between differentiated forms of English -- formal (presenting ideas) versus informal (small group discussions)"],
          ["Discussion and Performance", "...prepares and gives oral presentations individually and within groups using appropriate facts and relevant descriptive details to support main ideas and themes"],
          ["Monitoring Language", "...self corrects while speaking"],
          ["Monitoring Language", "...identifies errors when others are speaking/and in writing"],
          ["Monitoring Language", "...speaks using appropriate vocabulary and accurate grammatical formats"],
          ["Monitoring Language", "...clarifies comprehension with questioning in English"],
          ["Oral Response", "...expresses/explains personal ideas in light of the discussion"],
          ["Oral Response", "...paraphrases information that has been presented in a diverse array of formats -- visually, orally and via media"],
          ["Oral Response", "...constructs questions and answers in a fluent manner that links to the presentations and remarks of others"],
          ["Oral Response", "...interact in conversational English"],
          ["Oral Response", "...give factual personal and non-personal information"],
          ["Oral Response", "...give opinions and feelings on a variety of matters"]
    ],
    "listening": [
          ["General Listening Comprehension", "...identify main idea of listening content"],
          ["General Listening Comprehension", "...identify sequence of listening content"],
          ["General Listening Comprehension", "...identify inferences of listening content"],
          ["General Listening Comprehension", "...identify cause and effect from listening content"],
          ["General Listening Comprehension", "...identify interjections from listening content"],
          ["General Listening Comprehension", "...review key ideas from responses of peers in discussion around them"],
          ["General Listening Comprehension", "...paraphrase what has been shared in an audio format"],
          ["General Listening Comprehension", "...identify simple, factual information"],
          ["Listening for Information via Audio/Media", "...listens to recorded voices by people of different ages, speaking rates, genders and accents-- responds with a summarization of content and/or questions on comprehension"],
          ["Listening for Information via Audio/Media", "...responds to questions posed about audio in writing or drawing"],
          ["Listening for Information via Audio/Media", "...identifies “explicit markers” that express the emphasis of what is being spoken about"],
          ["Listening for Information via Audio/Media", "...verbally explains how visual cues enhance audio comprehension"],
          ["Listening for Information via Audio/Media", "...utilizes media sources in presentations to enhance development of main ideas or themes"],
          ["Listening for Information via Authentic Assessment", "...identifies key concepts from peer presentations and records examples within notebook"],
          ["Listening for Information via Authentic Assessment", "...identifies the reasons and evidence a speaker provides to support particular points of study"]
    ],
    "grammar": [
          ["General Verb Knowledge", "…conjugate the verbs to be, to have, to do, into their correct present, past, future and past participle forms for proper use in various verb tenses"],
          ["Simple Present", "...talk and write about general truths, habits and routines."],
          ["Simple Present", "...talk and write about activities and actions happening now"],
          ["Simple Present", "...interview friends about their routines and habits"],
          ["Simple Present", "….write a paragraph about a talent and/or hobby."],
          ["Simple Present", "...determine appropriate clue words indicating the use of the present simple"],
          ["Present Continuous", "...express events happening at the moment of speaking"],
          ["Present Continuous", "...discuss their plans for the near future"],
          ["Present Continuous", "...determine appropriate clue words indicating use of the present continuous"],
          ["Present Continuous", "...produce a piece of writing effectively using the present continuous"],
          ["Simple Past", "...describe events that began and finished in the past"],
          ["Simple Past", "...form the past tense of regular and irregular verbs"],
          ["Simple Past", "...discuss and write about past events using the negative and interrogative forms."],
          ["Past Continuous", "...talk about an action in progress in the past"],
          ["Past Continuous", "...use the past simple and the past continuous together to describe an action that happened while another action was in progress."],
          ["Past Continuous", "...determine the appropriate use of “when” and “while”"],
          ["Future using “will”", "...make predictions about future events"],
          ["Future using “will”", "...talk about making promises or offers"],
          ["Future using “will”", "...verbalize a sudden decision w/o planning it."],
          ["Future using “will”", "...distinguish between using the present continuous vs. “will” for future arrangements"],
          ["Present Perfect Simple", "...describe events which began in the past and continue to the present"],
          ["Present Perfect Simple", "...form the past participle of regular and irregular verbs (V3)"],
          ["Present Perfect Simple", "...determine appropriate clue words indicating the use of the present perfect simple"],
          ["Present Simple Passive", "...recognize the difference between active and passive constructions"],
          ["Present Simple Passive", "...transform active sentences into the passive"],
          ["Modal Verbs", "...express ability, possibility, obligation, and prohibition"],
          ["Modal Verbs", "...ask for permission"],
          ["Modal Verbs", "...describe necessity"],
          ["Adjectives (Comparative Superlative)", "...transform various nouns into adjectives"],
          ["Adjectives (Comparative Superlative)", "...form the comparatives and superlatives of a variety of adjectives while following the correct spelling rules"],
          ["Adjectives (Comparative Superlative)", "...express facts and opinions in speech and writing using comparatives and superlatives"],
          ["Adverbs", "...describe the frequency of routines and habits"],
          ["Adverbs", "...describe how something happens"],
          ["Adverbs", "...form adverbs, both regular and irregular, from adjectives"]
    ]
  },
 grade6: {}
};