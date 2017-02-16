const handlers = {
  get: function (request, reply) {


    // Concession
    if (request.session.age > 65) {
      request.session.isConcession = true
      request.session.isSenior = true
    } else if (request.session.age < 17) {
      request.session.isConcession = true
      request.session.isJunior = true
    } else if (request.session.hasBlueBadge === true || request.session.hasNINumber === true) {
      request.session.isConcession = true
    } else {
      request.session.isConcession = false
    }

    // 1 Day
    if (request.session.licenceLength === '1-day') {
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = "£12.00"
      } else {
        request.session.cost = "£6.00"
      }
    }

    // 8 Day
    if (request.session.licenceLength === '8-days') {
      if (request.session.licenceType === 'Salmon and sea trout') {
        request.session.cost = "£27.00"
      } else {
        request.session.cost = "£12.00"
      }
    }

    // 12 Months
    if (request.session.licenceLength === '12-months' || request.session.licenceLength === '365-days') {
        request.session.isFull = true;
      // Junior
      if (request.session.age < 17 ) {
        request.session.cost = "00.00"
      }
      // Salmon
      if (request.session.licenceType === 'Salmon and sea trout') {
        if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = "£54.00"
        } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
          request.session.cost = "£54.00"
        } else {
          request.session.cost = "£82.00"
        }
      } else {
        if(request.session.numberOfRods === 'Up to 3 rods') {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£30.00"
          } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
            request.session.cost = "£30.00"
          } else {
            request.session.cost = "£45.00"
          }
        } else {
          if (request.session.age  > 65 || request.session.hasBlueBadge === true) {
            request.session.cost = "£20.00"
          } else if (request.session.age  > 65 || request.session.hasNINumber === true) {
            request.session.cost = "£20.00"
          } else {
            request.session.cost = "£30.00"
          }
        }
      }
    }


    if (request.session.isJunior === true) {
      request.session.cost = "£00.00"
    }

    // Upgrade costs
      if (request.session.isUpgrade === true) {
         if (request.session.licenceNumber === '00010418-3WC3JDS-B7A711') {
             if(request.session.numberOfRods === 'Up to 3 rods') {
               request.session.cost = '£15.00 (save £30.00)'
             } else {
               request.session.cost = '£52.00 (save £30.00)'
             }
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A712') {
             request.session.cost = '£15.00 (save £30.00)'
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A713') {
              if (request.session.hasBlueBadge === true || request.session.hasNINumber === true || request.session.age > 65) {
                if(request.session.numberOfRods === 'Up to 3 rods') {
                  request.session.cost = '£18.00 (save £12.00)'
                } else {
                  request.session.cost = '£8.00 (save £12.00)'
                }
              } else {
                  if(request.session.numberOfRods === 'Up to 3 rods') {
                    request.session.cost = '£33.00 (save £12.00)'
                } else {
                  request.session.cost = '£18.00 (save £12.00)'
                }
              }
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A714') {
             request.session.cost = '£70.00 (save £12.00)'
         } else if (request.session.licenceNumber === '00010418-3WC3JDS-B7A715') {
             request.session.cost = '£24.00 (save £6.00)'
         }
      }


    //End dates
    if (request.session.isUpgrade === false) {
      var options = {
          weekday: "long", year: "numeric", month: "short", day: "numeric"
      };

      if (request.session.licenceLength === '1-day') {
        var tomorrow = new Date(Date.parse(request.session.date));
        tomorrow.setDate(tomorrow.getDate() + 1);
        request.session.endDate = tomorrow.toLocaleDateString("en-us", options)
      } else if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)' || request.session.licenceLength === '8-days') {
        var eightDays = new Date(Date.parse(request.session.date));
        eightDays.setDate(eightDays.getDate() + 8);
        request.session.endDate = eightDays.toLocaleDateString("en-us", options)
      } else {
        var threeSixFiveDays = new Date(Date.parse(request.session.date));
        threeSixFiveDays.setDate(threeSixFiveDays.getDate() + 365);
        request.session.endDate = threeSixFiveDays.toLocaleDateString("en-us", options)
      }
    }


    if (request.session.licenceLength === '365-days') {
      request.session.licenceLength = '12-months'
    }


    return reply.view('summary', {
      pageTitle: 'Check your licence details',
      nameOnLicence: request.session.holderName,
      licenceDOB: request.session.dateOfBirth,
      email: request.session.email,
      mobile: request.session.mobile,
      address: request.session.Address,
      licenceType: request.session.licenceType,
      numberOfRods: request.session.numberOfRods,
      licenceLength: request.session.licenceLength,
      startDate: request.session.startDate,
      startText: request.session.startText,
      startTime: request.session.startTime,
      cost: request.session.cost,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasNINumber: request.session.hasNINumber,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      isSalmon: request.session.isSalmon,
      isCoarse: request.session.isCoarse,
      licenceNumber: request.session.licenceNumber,
      isUpgrade: request.session.isUpgrade,
      isUpgradeLength: request.session.isUpgradeLength,
      changeDetails: request.session.changeDetails
    })
  },
  post: function (request, reply) {
    return reply.redirect('terms-conditions')
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/summary',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/summary',
  config: {
    handler: handlers.post
  }
}]
