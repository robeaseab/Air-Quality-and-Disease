

function buildRepData(input) {

    //  builds the politician data panel
  
    // Use `d3.json` to fetch the data for a sample
    var senatorUrl = "https://www.govtrack.us/api/v2/role?current=true&role_type=senator"
    var representativeUrl = "https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=438"

    d3.json(senatorUrl).then(function (senatorData) {
      console.log(senatorData);
      
    //   //     // Use d3 to select the panel with id of `#sample-metadata`
    //   var panel = d3.select('#sample-metadata');
    //   //     // Use `.html("") to clear any existing metadata
    //   panel.html(" ");
  
    //   panel.append('p').html(`AGE: ${metaData.AGE}`);
    //   panel.append('p').html(`BBTYPE: ${metaData.BBTYPE}`);
    //   panel.append('p').html(`ETHNICITY: ${metaData.ETHNICITY}`);
    //   panel.append('p').html(`GENDER: ${metaData.Gender}`);
    //   panel.append('p').html(`LOCATION: ${metaData.LOCATION}`);
    //   panel.append('p').html(`WFREQ: ${metaData.WFREQ}`);
    //   panel.append('p').html(`sample: ${sample}`);
  
  
    });
  
  }