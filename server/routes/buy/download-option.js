const handlers = {
  get: function (request, reply) {
    return reply.view('download-option', {
      pageTitle: 'Licenses are free when you\'re between 12 and 16',
      errorMessage: 'Choose a licence type',
      items: {
        one: {
          text: 'Trout and coarse',
          name: 'licence_type',
          id: 'Trout and coarse',
          value: 'Trout_and_coarse',
          // selectedText: 'Non-migratory ',
        },
        two: {
          text: 'Salmon and sea trout',
          subText: 'includes trout and coarse fish',
          name: 'licence_type',
          id: 'Salmon and sea trout',
          value: 'Salmon_and_sea_trout',
          // selectedText: 'Migratory',
        },
      }
    })
  },
  post: function (request, reply) {
    request.session.licenceType = request.payload.licence_type

    // Rods
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.numberOfRods ='1 rod (or up to 3 rods for coarse fish)'
      } else if (request.session.licenceType === 'Trout and coarse') {
          request.session.numberOfRods = 'Up to 2 rods'
      }

      //request.session.startDate = 'Today'
      request.session.licenceLength = '365-days'
      request.session.startTime = "30 minutes after payment"

      var date = new Date();
      var options = {
          day: "numeric", month: "long", year: "numeric"
      };
      request.session.startDate = date.toDateString("en-us", options)
      request.session.date = date
      var threeSixFiveDays = new Date(Date.parse(request.session.date));
      threeSixFiveDays.setDate(threeSixFiveDays.getDate() + 365);
      request.session.endDate = threeSixFiveDays.toDateString("en-us", options)

    returnURL = request.query.returnUrl
      if (returnURL) {
      return reply.redirect(returnURL)
    } else {
      return reply.redirect('summary')
    }
  }
}


module.exports = [{
  method: 'GET',
  path: '/buy/download-option',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/download-option',
  config: {
    handler: handlers.post
  }
}]
