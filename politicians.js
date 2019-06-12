

function buildRepData(input) {

    //  builds the politician data panel
  
    // Use `d3.json` to fetch the data for a sample
    var senatorUrl = "https://www.govtrack.us/api/v2/role?current=true&role_type=senator"
    var representativeUrl = "https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=438"

    d3.json(senatorUrl).then(function (senatorData) {
      var objects = senatorData.objects;
      
      for (var i = 0; i < objects.length; i++) {
        
        var state = objects[i].state;
        var firstname = objects[i].person.firstname;
        var lastname = objects[i].person.lastname;
        var phone = objects[i].phone;
        var title = objects[i].title_long;
        var party = objects[i].party;
        var address = objects[i].extra.address;
        var contact = objects[i].extra.contact_form;
        
        console.log(state);
      
      



      //     // Use d3 to select the panel with id of `#sample-metadata`
      var panel = d3.select('#politicians-card');
      //     // Use `.html("") to clear any existing metadata
      panel.html(" ");
      
  
      panel.append('p').html(`STATE: ${state}`);
      panel.append('p').html(`NAME: ${firstname} ${lastname}`);
      panel.append('p').html(`TITLE: ${title}`);
      panel.append('p').html(`PHONE: ${phone}`);
      panel.append('p').html(`PARTY: ${party}`);
      panel.append('p').html(`ADDRESS: ${address}`);
      panel.append('p').html(`CONTACT:  <a href="${contact}">${firstname} ${lastname}</a> `);
  
  };
});
  
  };

  buildRepData();
  ;