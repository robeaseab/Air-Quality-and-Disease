var senatorUrl = "https://www.govtrack.us/api/v2/role?current=true&role_type=senator"
var representativeUrl = "https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=438"

var stateList = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MH", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "PW", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

var button = d3.select("#state-btn");


// var state_input = d3.select

function formClick() {
  d3.event.preventDefault();
  // get value of drop down choice
  var entryType = d3.select("#selDataset");
  var state_input = entryType.property("value");
  console.log(state_input);


  d3.json(senatorUrl).then(function (senatorData) {
    var objects = senatorData.objects;

    for (var i = 0; i < objects.length; i++) {
      if (objects[i].state == state_input) {
        var s_state = objects[i].state;
        var s_firstname = objects[i].person.firstname;
        var s_lastname = objects[i].person.lastname;
        var s_phone = objects[i].phone;
        var s_title = objects[i].title_long;
        var s_party = objects[i].party;
        var s_address = objects[i].extra.address;
        var s_contact = objects[i].extra.contact_form;

        // Use d3 to select the panel with id of `#politicians-card`
        var panel = d3.select('#politicians-card');

        var box = panel.append('div').attr("class", "panel panel-primary");
        var head = box.append("div").attr("class", "panel-heading");
        var title = head.append("div").attr("class", "panel-title").html(`  ${s_firstname} ${s_lastname}, ${s_state} ${s_title}`).enter();
        var body = head.append("div").attr("class", "panel-body");
        head.append('p').html(`  PHONE: ${s_phone}`).enter();
        head.append('p').html(`  PARTY: ${s_party}`);
        head.append('p').html(`  ADDRESS: ${s_address}`);
        head.append('p').html(`  CONTACT:  <a href="${s_contact}">${s_firstname} ${s_lastname}</a>`);
      };
    };


    d3.json(representativeUrl).then(function (repData) {
      var objects = repData.objects;

      for (var i = 0; i < objects.length; i++) {
        if (objects[i].state == state_input) {
          var r_state = objects[i].state;
          var r_firstname = objects[i].person.firstname;
          var r_lastname = objects[i].person.lastname;
          var r_phone = objects[i].phone;
          var r_title = objects[i].title_long;
          var r_party = objects[i].party;
          var r_address = objects[i].extra.address;
          var r_contact = objects[i].extra.contact_form;

          var panel = d3.select('#politicians-card');

          var box = panel.append('div').attr("class", "panel panel-primary");
          var head = box.append("div").attr("class", "panel-heading");
          var title = head.append("div").attr("class", "panel-title").html(`  ${r_firstname} ${r_lastname}, ${r_state} ${r_title}`).enter();
          var body = head.append("div").attr("class", "panel-body");
          head.append('p').html(`  PHONE: ${r_phone}`).enter();
          head.append('p').html(`  PARTY: ${r_party}`);
          head.append('p').html(`  ADDRESS: ${r_address}`);
          head.append('p').html(`  CONTACT:  <a href="${r_contact}">${r_firstname} ${r_lastname}</a>`);
        };
      };
    });
  });
};

button.on("click", formClick);


