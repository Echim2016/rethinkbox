function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
		var colors = [
			'#490A3D',
			'#BD1550',
			'#E97F02',
			'#F8CA00',
			'#8A9B0F',
			'#69D2E7',
			'#FA6900',
			'#16a085',
			'#27ae60',
			'#2c3e50',
			'#f39c12',
			'#e74c3c',
			'#9b59b6',
			'#FB6964',
			'#342224',
			'#472E32',
			'#77B1A9',
			'#73A857'
		];


     var topic = ["嗨，想聊些什麼？"];
     var group = ["這是問題分類"];
     var group2 = [""];
     // var estTime = [];

     // var dislike = [""];
     // var like = [""];
     var featured =[]
     var weight = [];
     var no = [];
     var like = [];
     var dislike = [];

     var drawArray=[];
     var noArray=[];
     var disArray=[];
     var likeArray=[];
     var featuredArray=[];

     var randomquote = 0;
     var randomcolor = "";
     var currentQuote = "累了嗎？別忘了這裡有一些靈感給你，點擊「來點靈感」開始漫遊！";


     $.getJSON('https://spreadsheets.google.com/feeds/list/1JMQMEp269AJuPhaFJYjvePRlaWWTSD2NyeVx-VG6F7E/od6/public/values?alt=json', function (data){

       for (var i = 0; i < data.feed.entry.length; i++){
            topic[i] = data.feed.entry[i].gsx$topic['$t'];
            // group[i] = data.feed.entry[i].gsx$group['$t'];
            // group2[i] = data.feed.entry[i].gsx$group2['$t'];
            // estTime[i]= data.feed.entry[i].gsx$time['$t'];
            featured[i]= data.feed.entry[i].gsx$featured['$t'];
            like[i]= data.feed.entry[i].gsx$like['$t'];
            dislike[i]= data.feed.entry[i].gsx$dislike['$t'];
            weight[i]= data.feed.entry[i].gsx$weight['$t'];
            no[i]= data.feed.entry[i].gsx$no['$t'];

            for (var j = 0; j < weight[i]; j++) {
              drawArray.push(topic[i]);
              noArray.push(no[i]);
              disArray.push(dislike[i]);
              likeArray.push(like[i]);
              featuredArray.push(featured[i]);

            }
      }
      // getQuote();
      });



function pressDislike(){
  var url='https://script.google.com/macros/s/AKfycbyka_VfjwoIsVAInzmto_jSxf-UClo5-gjbHuiNgn6caG48Qys/exec';
  // console.log(disArray[randomquote]);
  // console.log(randomquote);
  // console.log(noArray[randomquote]);
  $.ajax({
        url: url,
        type: 'GET',
        data:{
          "like":0,
          "dislike":disArray[randomquote],
          "row":noArray[randomquote],
          "column":9,
          "action":"dislike"
        },
        success: function(res) {
            // alert("Successfully submitted");
        }
    });
    getQuote();
}

function pressLike(){
  var url='https://script.google.com/macros/s/AKfycbyka_VfjwoIsVAInzmto_jSxf-UClo5-gjbHuiNgn6caG48Qys/exec';
  $.ajax({
        url: url,
        type: 'GET',
        data:{
          "like":likeArray[randomquote],
          "dislike":0,
          "row":noArray[randomquote],
          "column":8,
          "action":"like"
        },
        success: function(res) {

           //  Swal.fire({
           //    type: 'success',
           //    title: '讚啦，祝你有個愉快的Check-in時光！',
           //    showConfirmButton: false,
           //    timer: 6000
           //  })
           //  setTimeout(function(){// wait for 5 secs(2)
           //      location.reload(); // then reload the page.(3)
           // }, 2000);
        }
    });
    getQuote();


}


var currentText = "";
var getQuoteCount =0;

function getQuote() {
    getQuoteCount++;
    currentText ="";
    randomquote = Math.floor(Math.random() * drawArray.length);

      currentQuote = drawArray[randomquote];
      currentText = featuredArray[randomquote];

    // }

	$(document).ready(function () {
	    $('html body').animate({
	        backgroundColor: colors[randomcolor],
	        color: colors[randomcolor]
	    }, 500);
	    $('#newquote, .social-icons .fa-twitter').animate({ backgroundColor: colors[randomcolor] }, 500);
			$('blockquote footer').animate({ color: colors[randomcolor] }, 500);
	    $('blockquote').animate({ borderLeftColor: colors[randomcolor] }, 500);
	    $('#quotetext').animate({ opacity: 0 }, 500, function () {
	        $(this).animate({ opacity: 1 }, 500);
	        $(this).text(currentQuote);
	    });
	    $('#quotesource').animate({ opacity: 0 }, 300, function () {
	        $(this).animate({ opacity: 0.7 }, 500);
	        $(this).text(currentText);
	    });
    });

}

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

$(document).ready(function () {
    setTimeout(function(){
      $('html,body').animate({scrollTop: 200},600);
    },1500)
    $('#quotetext').animate({ opacity: 0 }, 800, function () {
        $(this).animate({ opacity: 0.5 }, 500);
        $(this).text(currentQuote);
    });
    $('#newquote').on('click', getQuote);
    $('#btnDislike').on('click', pressDislike);
    $('#btnLike').on('click', pressLike);
    $('#tweetquote').on('click', function () {
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
});
