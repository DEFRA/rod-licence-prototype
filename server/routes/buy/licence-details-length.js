const handlers = {
  get: function (request, reply) {

    if (request.session.age  > 65) {
      request.session.upgradePrice = '£8.00'
      request.session.buyAgain = '£12.00'
    } else {
      request.session.upgradePrice = '£18.00'
      request.session.upgradeConcessionPrice = '£8.00'
      request.session.buyAgain = '£12.00'
    }

    return reply.view('licence-details-length', {
      pageTitle: 'What would you like to do?',
      errorMessage: 'Tell us what you\'d like to do',
      licenceNumber: request.session.licenceNumber,
      oldLicenceType: request.session.oldLicenceType,
      licenceType: request.session.licenceType,
      licenceLength: request.session.licenceLength,
      oldLicenceLength: request.session.oldLicenceLength,
      nameOnLicence: request.session.holderName,
      endDate: request.session.endDate,
      endText: request.session.endText,
      isJunior:  request.session.isJunior,
      isSenior: request.session.isSenior,
      hasBlueBadge: request.session.hasBlueBadge,
      hasDisabledConcession: request.session.hasDisabledConcession,
      isFull: request.session.isFull,
      isConcession: request.session.isConcession,
      oldConcession: request.session.oldConcession,
      isSalmon: request.session.isSalmon,
      isCoarse: request.session.isCoarse,
      startDate: request.session.startDate,
      startMonth: request.session.startMonth,
      startYear: request.session.startYear,
      startText: request.session.startText,
      startTime: request.session.startTime,
      upgradePrice: request.session.upgradePrice,
      upgradeConcessionPrice: request.session.upgradeConcessionPrice,
      buyAgain: request.session.buyAgain,


      items: {
        one: {
          text: 'Upgrade to 12-month licence',
          name: 'licence_details_upgrade',
          id: '12_month',
        },
        // two: {
        //   text: 'Buy this licence again',
        //   name: 'licence_details_upgrade',
        //   id: 'Buy_again',
        // },
      },
      items2: {
        one: {
          text: 'Buy a new licence',
          name: 'licence_details_upgrade',
          id: 'Buy_new',
        },
      }
    })
  },
  post: function (request, reply) {
    var upgradeOption = request.payload.licence_details_upgrade
    if (upgradeOption === '12_month') {
      request.session.isUpgradeLength = true
      request.session.isRenew = false
      request.session.isFull = true
      request.session.licenceLength = '12-months'
      return reply.redirect('licence-start-option')
    } else if (upgradeOption === 'Buy_again') {
      // request.session.changeDetails = true
      request.session.isRenew = true
      return reply.redirect('licence-start-option')
    } else {
      return reply.redirect('product-type')
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/buy/licence-details-length',
  config: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/buy/licence-details-length',
  config: {
    handler: handlers.post
  }
}]
