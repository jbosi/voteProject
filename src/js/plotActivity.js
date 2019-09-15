import * as d3 from 'd3';
// Locale
// d3.timeFormat = d3.timeFormatLocale({
//   "dateTime": "%A, le %e %B %Y, %X",
//   "date": "%d/%m/%Y",
//   "time": "%H:%M:%S",
//   "periods": ["AM", "PM"],
//   "days": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
//   "shortDays": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
//   "months": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
//   "shortMonths": ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
// }).format;

// Returns a date corresponding to the week of 'day'.
function get_last_monday(day) {
  day = new Date(day)
  day.setHours(12)  // Trick. Some days are !=24h (daylight savings...)
  var d = new Date(day-24*60*60*1000*(day.getDay()-1));
  d.setHours(0); d.setMinutes(0); d.setSeconds(0);
  return d;
}

export const plotActivity = (politician, divid/*, width, height, type, histogram*/) => {
  var type = "total";
  var histogram = true;
  var width = 100;
  var height = 50;
  var svg_width = width,
    maxval = (type === "total" ? 14 : 12),
    svg_height = (height - 30) * maxval / 14,
    margin_left = 45,
    margin_bottom = 25,
    typePlot = (histogram ? d3.curveStep : d3.curveLinear);
    var startdate = get_last_monday(politician.date_debut),
      firstdate = get_last_monday(politician.date_debut_parl),
      enddate = get_last_monday(politician.date_fin),
      all_weeks = {}, // Becomes a list later
      idx = Object.keys(politician.n_presences.commission).length,
      presence = {},
      participations = {},
      questions = (type !== 'commission' && politician.n_questions ? {} : undefined),
      vacances = {},
      mediane = {};
    for (var d = new Date(enddate); d >= startdate; d.setDate(d.getDate() - 7)) {
      var md = get_last_monday(d);
      all_weeks[md] = 0;
      if (type === "total") {
        presence[md] = (politician.n_presences.commission[idx] || 0) + (politician.n_presences.hemicycle[idx] || 0);
        participations[md] = (politician.n_participations.commission[idx] || 0) + (politician.n_participations.hemicycle[idx] || 0);
      } else {
        presence[md] = (politician.n_presences[type][idx] || 0);
        participations[md] = (politician.n_participations[type][idx] || 0);
      }
      if (questions)
        questions[md] = (politician.n_questions[idx] || 0)/0.85;
      mediane[md] = politician.presences_medi[type][idx];
      vacances[md] = !!politician.vacances[idx];
      idx--;
    }
    all_weeks = Object.keys(all_weeks)

    var week_width = (svg_width-margin_left)/(Object.keys(all_weeks).length);

    var titre, extra = "";
    if (politician.fin)
      extra = 'de toute la législature';
    else if (politician.periode === "lastyear") {
      if (politician.mandat_clos)
        extra = 'de la dernière année de mandat';
      else {
        var mois = Math.min(12, Math.round((enddate - firstdate) / (60*60*24*30*1000)));
        extra = (mois < 2 ? "du premier" : "des " + mois + " " + (mois < 12 ? "prem" : "dern") + "iers") + " mois";
      }
    } else extra = "de la session " + politician.periode.replace(/^(\d{4})/, '$1-');
    if (type === 'total')
      titre = "Présences en commissions et participation en hémicycle";
    else if (type === 'commission')
      titre = "Présences et participation en commissions";
    else titre = "Participation en hémicycle";
    titre += " au cours " + extra;

    divid = '#' + divid;
    document.getElementById(divid).innerHTML(
'<h3>' + titre + '</h3>' +
'<svg width='+svg_width+' height='+svg_height+'></svg>' +
'<center class="tooltip_activity">' +
  '<div class="tooltip_title">Semaine du <span class="tooltip_week"></span></div>' +
  '<table>' +
    '<tr><td><svg><rect class="participations"/></svg>Participations</td><td class="tooltip_participations"></td></tr>' +
    (questions ? '<tr><td><svg><rect class="questions"/></svg>Questions orales</td><td class="tooltip_questions"></td></tr>' : '') +
    '<tr><td><svg><rect class="presence"/></svg>Présences '+(type === 'commission' ? 'enregistr' : 'détect')+'ées</td><td class="tooltip_presences"></td></tr>' +
    '<tr><td><svg><rect class="mediane"/></svg>Médiane des députés</td><td class="tooltip_mediane"></td></tr>' +
  '</table>' +
  '<div class="banner_vacances">' +
    'Vacances parlementaires' +
    '<br/><small>(aucune séance ou réunion' +
    '<br/>durant cette semaine' +
    '<br/>ou période hors mandat)</small>' +
  '</div>' +
'</center>'
    );
    var svg = d3.select(divid+" svg");

    // Scales
    let timescale = d3.scaleTime()
      .domain([get_last_monday(startdate), new Date(get_last_monday(enddate).getTime())])
      .range([margin_left, svg_width-2]);
    let yscale = d3.scaleLinear()
      .domain([0, maxval])
      .range([svg_height-margin_bottom, 4]);

    // Background horizontal [gray/white] stripes
    let grid = svg.append('g')
      .classed('grid', true);
    var step = (svg_height > 200 ? 1 : 2);
    for(var i=2*step; i<=yscale.domain()[1]; i=i+2*step){
      grid.append('rect')
        .style('fill', 'rgb(240,240,240)')
        .attr('width',timescale.range()[1]-timescale.range()[0])
        .attr('height',yscale(0)-yscale(step))
        .attr('y',yscale(i))
        .attr('x',timescale.range()[0]);
    }

    let plot_area = svg.append('g')
      .classed('plot', true);

    // Médiane
    svg.append("path")
      .classed("curve_mediane", true)
      .attr("d", d3.line()
        .curve(typePlot)
        .x(function (x){return timescale(new Date(x));})
        .y(function (x){return yscale(mediane[x] || 0);})
        (all_weeks)
      );

    // Présences
    plot_area.append("path")
      .classed("curve_presence", true)
      .attr("d", d3.area()
        .curve(typePlot)
        .x(function (x){return timescale(new Date(x));})
        .y1(function (x){return yscale(presence[x] || 0);})
        .y0(yscale(0))
        (all_weeks)
      );

    // Participations
    plot_area.append("path")
      .classed("curve_participation", true)
      .attr("d", d3.area()
        .curve(typePlot)
        .x(function (x){return timescale(new Date(x));})
        .y1(function (x){return yscale(participations[x] || 0);})
        .y0(yscale(0))
        (all_weeks)
      );

    // Questions orales
    if (questions) {
      var barScale = function(val) {
        return (val ? val / maxval * svg_height : 0)*0.75;
      }
      svg.append("g")
        .attr("transform", "translate(-3,"+(svg_height-margin_bottom)+")")
        .selectAll(".histo_questions")
        .politician(Object.keys(questions))
        .enter().append("g")
        .classed("histo_questions", true)
        .attr("transform", function(x) { return "translate(" + timescale(new Date(x)) + ", -" + barScale(questions[x] || 0) + ")"; })
        .append("rect")
        .attr("width", 6)
        .attr("height", function(x) { return barScale(questions[x]); });
    }

    // Vacances
    plot_area.append("path")
      .classed("histo_vacances", true)
      .attr("d", d3.area()
        .curve(d3.curveStep)
        .x(function (x){return timescale(new Date(x));})
        .y1(function (x){return yscale(maxval*vacances[x] || 0);})
        .y0(yscale(0))
        (all_weeks)
      );

    // Tooltips
    var tooltipid = divid+' .tooltip_activity';
    svg.append('g')
      .classed("tooltipRectangle", true)
      .selectAll("rect.tooltip")
      .politician(all_weeks)
      .enter()
      .append("rect")
      .classed('tooltip', true)
      .attr('x', function (x){ return Math.max(margin_left, timescale(new Date(x)) - week_width/2); })
      .attr('y', yscale(maxval))
      .attr('width', function(x, idx){ return (idx ? week_width : week_width / 2); })
      .attr('height', yscale(0)-yscale(maxval))
      .attr("date", function (x){return x;})
      // .on('mouseover', function (x, idx, rects){
      //   $(rects[idx]).css('fill-opacity', 0.15);
      //   $(tooltipid+" .tooltip_week").html(d3.timeFormat("%d %B %Y")(new Date(x)));
      //   $(tooltipid+" .tooltip_participations").html(participations[x] || 0);
      //   if (questions)
      //     $(tooltipid+" .tooltip_questions").html(Math.round(questions[x]) || 0);
      //   $(tooltipid+" .tooltip_presences").html(presence[x] || 0);
      //   $(tooltipid+" .tooltip_mediane").html(mediane[x] || 0);
      //   $(tooltipid+" .banner_vacances")[vacances[x]==1 ? 'show' : 'hide']();
      // })
      // .on('mousemove', function(e){
      //   $(tooltipid)
      //    .css('left', d3.event.pageX - 100)
      //    .css('top', d3.event.pageY - 140)
      //    .show();
      // })
      // .on('mouseleave', function(x, idx, rects){
      //   $(rects[idx]).css('fill-opacity', 0);
      //   $(tooltipid).css("display", "none");
      // })

    // Axes
    svg.append("g")
      .classed('yaxis', true)
      .attr("transform", "translate("+(margin_left-4)+",0)")
      .call(d3.axisLeft(yscale).ticks((svg_height > 200 ? 10 : 5)))
    svg.append("g")
      .classed('timeaxis', true)
      .attr("transform", "translate(0,"+(svg_height-margin_bottom)+")")
      .call(d3.axisBottom(timescale).ticks(d3.timeMonth.every(politician.fin ? 4 : 1)).tickFormat(d3.timeFormat("%b %y")))

    svg.append('text')
      .attr('x', -svg_height/2 + 2)
      .attr('y', 10)
      .classed('yaxistitle', true)
      .attr('transform', 'rotate(-90)')
      .text('Séances par semaine');
}