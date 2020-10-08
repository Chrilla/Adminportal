function getFullName(firstname, lastname) {
    fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstname}&lastname=${lastname}`)
    .then(res => res.text())
    .then(data => document.getElementById('username').innerHTML = data)
    .then(data => document.getElementById('usermsg').innerHTML = data)
}
getFullName('Christoffer', 'Olsson')

function getTotalSales() {
    fetch(`https://inlupp-fa.azurewebsites.net/api/total-sales`)
    .then(res => res.json())
    .then(data => document.getElementById('totalSales').innerHTML = `${data.currency}${data.amount}`)
}
getTotalSales()

function getTotalPurchases() {
    fetch(`https://inlupp-fa.azurewebsites.net/api/total-purchases`)
    .then(res => res.json())
    .then(data => document.getElementById('totalPurchases').innerHTML = `${data.currency}${data.amount}`)
}
getTotalPurchases()

function getTotalOrders() {
    fetch(`https://inlupp-fa.azurewebsites.net/api/total-orders`)
    .then(res => res.json())
    .then(data => document.getElementById('totalOrders').innerHTML = `${data.currency}${data.amount}`)
}
getTotalOrders()

function getTotalGrowth() {
    fetch(`https://inlupp-fa.azurewebsites.net/api/total-Growth`)
    .then(res => res.json())
    .then(data => document.getElementById('totalGrowth').innerHTML = `${data.currency}${data.amount}`)
}
getTotalGrowth()

const messages1 = document.getElementById('message1');
const messages2 = document.getElementById('message2');
const messages3 = document.getElementById('message3');
const messageName1 = document.getElementById('messageName1');
const messageName2 = document.getElementById('messageName2');
const messageName3 = document.getElementById('messageName3');

fetch('http://inlupp-fa.azurewebsites.net/api/messages')
.then(res => res.json())
.then(data => {
    message1.innerHTML = data[0].title;
    message2.innerHTML = data[1].title;
    message3.innerHTML = data[2].title;
    messageName1.innerHTML = data[0].from;
    messageName2.innerHTML = data[1].from;
    messageName3.innerHTML = data[2].from;
})

const notification1 = document.getElementById('notification1');
const notification2 = document.getElementById('notification2');
const notification3 = document.getElementById('notification3');
const notificationSubTitle1 = document.getElementById('notificationSubTitle1');
const notificationSubTitle2 = document.getElementById('notificationSubTitle2');
const notificationSubTitle3 = document.getElementById('notificationSubTitle3');

fetch('https://inlupp-fa.azurewebsites.net/api/notifications')
.then(res => res.json())
.then(data => {
    notification1.innerHTML = data[0].title;
    notification2.innerHTML = data[1].title;
    notification3.innerHTML = data[2].title;
    notificationSubTitle1.innerHTML = data[0].subtitle;
    notificationSubTitle2.innerHTML = data[1].subtitle;
    notificationSubTitle3.innerHTML = data[2].subtitle;
})

const offlineDownloads = document.getElementById('offlineDownloads');
const onlineDownloads = document.getElementById('onlineDownloads');

fetch('https://inlupp-fa.azurewebsites.net/api/downloads')
.then(res => res.json())
.then(data => {
    offlineDownloads.innerHTML = data[0].offlineAmount;
    onlineDownloads.innerHTML = data[1].onlineAmount;
})

if ($('#offlineProgress').length) {
  var bar = new ProgressBar.Circle(offlineProgress, {
    color: '#000',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 6,
    trailWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: true,
      style : {
        color : "#fff",
        position: 'absolute',
        left: '40%',
        top: '50%'
      }
    },
    svgStyle: {
      width: '90%'
    },
    from: {
      color: '#f1536e',
      width: 6
    },
    to: {
      color: '#f1536e',
      width: 6
    },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }

    }
  });

  bar.text.style.fontSize = '1rem';
  bar.animate(.65); // Number from 0.0 to 1.0
}

if ($('#onlineProgress').length) {
  var bar = new ProgressBar.Circle(onlineProgress, {
    color: '#000',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 6,
    trailWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: true,
      style : {
        color : "#fff",
        position: 'absolute',
        left: '40%',
        top: '50%'
      }
    },
    svgStyle: {
      width: '90%'
    },
    from: {
      color: '#fda006',
      width: 6
    },
    to: {
      color: '#fda006',
      width: 6
    },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }

    }
  });

  bar.text.style.fontSize = '1rem';
  bar.animate(.25); // Number from 0.0 to 1.0
}

fetch('https://inlupp-fa.azurewebsites.net/api/total-users')
.then(res => res.json())
.then(data => { document.getElementById('h2Users').innerHTML = `${data.users}`
                document.getElementById('pUsers').innerHTML = `${data.growth + '%'}`
    if ($("#graphUsers").length) {
        var areaData = {
          labels: data.dataset.labels,
          datasets: [{
              data: data.dataset.data,
              backgroundColor: [
                '#e0fff4'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: "purchases"
            }
          ]
        };
        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            filler: {
              propagate: false
            }
          },
          scales: {
            xAxes: [{
              display: false,
              ticks: {
                display: true
              },
              gridLines: {
                display: false,
                drawBorder: false,
                color: 'transparent',
                zeroLineColor: '#eeeeee'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: true,
                autoSkip: false,
                maxRotation: 0,
                stepSize: 100,
                min: 0,
                max: 300
              },
              gridLines: {
                drawBorder: false
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          elements: {
            line: {
              tension: .35
            },
            point: {
              radius: 0
            }
          }
        }
        var salesChartCanvas = $("#graphUsers").get(0).getContext("2d");
        var salesChart = new Chart(salesChartCanvas, {
          type: 'line',
          data: areaData,
          options: areaOptions
        });
      }
})

fetch('https://inlupp-fa.azurewebsites.net/api/total-projects')
.then(res => res.json())
.then(data => { document.getElementById('h2Projects').innerHTML = `${data.projects + '%'}`
                document.getElementById('pProjects').innerHTML = `${data.growth + '%'}`
    if ($("#graphProjects").length) {
        var areaData = {
            labels: data.dataset.labels,
            datasets: [{
                data: data.dataset.data,
                backgroundColor: [
                '#e5f2ff'
                ],
                borderWidth: 2,
                borderColor: "#3da5f4",
                fill: 'origin',
                label: "purchases"
            }
            ]
        };
        var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
            filler: {
                propagate: false
            }
            },
            scales: {
            xAxes: [{
                display: false,
                ticks: {
                display: true
                },
                gridLines: {
                display: false,
                drawBorder: false,
                color: 'transparent',
                zeroLineColor: '#eeeeee'
                }
            }],
            yAxes: [{
                display: false,
                ticks: {
                display: true,
                autoSkip: false,
                maxRotation: 0,
                stepSize: 100,
                min: 0,
                max: 300
                },
                gridLines: {
                drawBorder: false
                }
            }]
            },
            legend: {
            display: false
            },
            tooltips: {
            enabled: true
            },
            elements: {
            line: {
                tension: .05
            },
            point: {
                radius: 0
            }
            }
        }
        var salesChartCanvas = $("#graphProjects").get(0).getContext("2d");
        var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
        });
    }
})

fetch('https://inlupp-fa.azurewebsites.net/api/total-sales-chart')
.then(res => res.json())
.then(data => {
    document.getElementById('revenue').innerHTML = `${data.revenue}`
    document.getElementById('returns').innerHTML = `${data.returns}`
    document.getElementById('queries').innerHTML = `${data.queries}`
    document.getElementById('invoices').innerHTML = `${data.invoices}`
  if ($("#graphTotalSales").length) {
    var areaData = {
      labels: data.labels,
      datasets: [
        {
          data: data.datasets[0].data,
          backgroundColor: [
            'rgba(61, 165, 244, .0)'
          ],
          borderColor: [
            'rgb(61, 165, 244)'
          ],
          borderWidth: 2,
          fill: 'origin',
          label: "services"
        },
        {
          data: data.datasets[1].data,
          backgroundColor: [
            'rgba(241, 83, 110, .0)'
          ],
          borderColor: [
            'rgb(241, 83, 110)'
          ],
          borderWidth: 2,
          fill: 'origin',
          label: "services"
        }
      ]
    };
    var areaOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        filler: {
          propagate: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            display: true,
            padding: 20,
            fontColor:"#000",
            fontSize: 14
          },
          gridLines: {
            display: false,
            drawBorder: false,
            color: 'transparent',
            zeroLineColor: '#eeeeee'
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            display: true,
            autoSkip: false,
            maxRotation: 0,
            stepSize: 100,
            fontColor: "#000",
            fontSize: 14,
            padding: 18,
            stepSize: 100000,
            callback: function(value) {
              var ranges = [
                  { divider: 1e6, suffix: 'M' },
                  { divider: 1e3, suffix: 'k' }
              ];
              function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                    }
                  }
                  return n;
              }
              return formatNumber(value);
            }
          },
          gridLines: {
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      elements: {
        line: {
          tension: .37
        },
        point: {
          radius: 0
        }
      }
    }
    var revenueChartCanvas = $("#graphTotalSales").get(0).getContext("2d");
    var revenueChart = new Chart(revenueChartCanvas, {
      type: 'line',
      data: areaData,
      options: areaOptions
    });
  }
})