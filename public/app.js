// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        var id = data[i]._id
        var title = data[i].title
        var link = data[i].link
        var body = data[i].body
        var saveBtn = $("<button>").attr("class", "btn btn-primary saveBtn").attr("data-id", id).attr("action", "save").text("Save Article");
        var story = $("<div>").attr("class", "well");
        var title = $("<h2>").attr("data-id", id).attr("class", "title").text(title);
        var body = $("<p>").text(body);
        var link = $("<a>").attr("href", link).attr("class", "contLink").text("Click Here");
        body.append(link)
        story.append(title);
        story.append(body);
        story.append(saveBtn);
        // Display the apropos information on the page
        $("#articles").append(story);
    }
});

$.getJSON("/savedArticles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        var id = data[i]._id
        var title = data[i].title
        var link = data[i].link
        var body = data[i].body
        var noteBtn = $("<button>").attr("class", "btn btn-primary noteBtn").attr("data-id", id).text("Add a Note");
        var deleteBtn = $("<button>").attr("class", "btn btn-primary deleteBtn").attr("action", "delete").attr("data-id", id).text("Delete Article");
        var story = $("<div>").attr("class", "well");
        var title = $("<h2>").attr("data-id", id).attr("class", "title").text(title);
        var body = $("<p>").text(body);
        var link = $("<a>").attr("href", link).attr("class", "contLink").text("Click Here");
        body.append(link)
        story.append(title);
        story.append(body);
        story.append(noteBtn);
        story.append(deleteBtn);

        // Display the apropos information on the page
        $("#savedArticles").append(story);
    }
});

$(document).on("click", ".deleteBtn", function() {
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/delete/" + thisId.toString()
        })
        .done(function(data) {
            console.log("Deleted");
        });
    location.reload();

    //need to change page to view the saved articles
});

$(document).on("click", ".saveBtn", function() {
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/save/" + thisId.toString()
        })
        .done(function(data) {
            console.log("Save Clicked")
        });
    //need to change page to view the saved articles
});
// Whenever someone clicks a p tag
$(document).on("click", ".noteBtn", function() {
    event.preventDefault();
    // Empty the notes from the note section
    $("#notes").empty();
    $("#currentNotes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/savedArticles/" + thisId
        })
        // With that done, add the note information to the page
        .done(function(data) {
            console.log(data);


            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'>Type your note here.</textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
            // // If there's a note in the article
            // if (data.notes) {
            //     var body = $("<div>").attr("class", "well note");
            //     var content = $("<p>").text(data.note.note)
            //     body.append(content)
            //         // Place the body of the note in the body textarea
            //     $("#currentNotes").append(body);
            // }
        });
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    return false;
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/saveNote/" + thisId,
            data: {
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});