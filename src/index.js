var mocha = require('mocha');

var SimpleMochaReporter = function () {
    var reportContent = `<html><head>
                        <script type="text/javascript">
                            function showPopUp(el,msg) {
                                var cvr = document.getElementById("cover");
                                var dlg = document.getElementById(el);
                                document.getElementById("dialogcontent").innerText = msg;
                                cvr.style.display = "block";
                                dlg.style.display = "block";
                                if (document.body.style.overflow = "hidden") {
                                    cvr.style.width = "100%";
                                    cvr.style.height = "100%";
                                }
                            }
                            function closePopUp(el) {
                                var cvr = document.getElementById("cover")
                                var dlg = document.getElementById(el)
                                cvr.style.display = "none"
                                dlg.style.display = "none"
                                document.body.style.overflowY = "scroll"
                            }
                      </script>
                      <style>
                            #mochastyle {
                                font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                                width: 70%;
                                border-collapse: collapse;
                            }
                            #mochastyle td, #mochastyle th {
                                font-size: 1em;
                                border: 1px solid rgb(10, 25, 114);
                                padding: 3px 7px 2px 7px;
                            }
                            #mochastyle th {
                                font-size: 1.1em;
                                text-align: left;
                                padding-top: 5px;
                                padding-bottom: 4px;
                                background-color: rgb(10, 25, 114);
                                color: #ffffff;
                            }
                            #mochastyle tr.alt td {
                                white-space:pre;	
                                color: #000000;
                                background-color: #EAF2D3;
                            }
                            #dialog {
                              position:absolute;
                              top:50%;
                              left:50%;
                              width:600px;  
                              height:400px;   
                              background: white;
                              border-style: outset;
                              margin-left:-200px;   
                              margin-top:-200px;   
                              
                          }
                          #cover {
                            display:        none;
                            position:       absolute;
                            left:           0px;
                            top:            0px;
                            width:          100%;
                            height:         100%;
                            background:     gray;
                            filter:         alpha(Opacity = 50);
                            opacity:        0.5;
                            -moz-opacity:   0.5;
                            -khtml-opacity: 0.5
                        }
                      </style></head><body>
                      <div id="cover"></div>
                      <div id="dialog" hidden>
                          <br><div align="center"><b>Error Details</b></div><br>
                          <div align="center" id='dialogcontent' style='overflow-y: scroll;'></div>
                          <br>
                          <div align="center"><button align="center" onclick="closePopUp('dialog');">Close</a></div>
                      </div>

                      <table width='80%' align='center'><tr><th align='center'><h1>Test Report</h1></th></tr></table><table id="mochastyle" border='1' align='center' width='80%'><tr><th>Test Summary</th><th>Result</th><th>Duration</th></tr>`;

    var report = function (runner) {
        mocha.reporters.Base.call(this, runner);
        var passes = 0;
        var failures = 0;

        runner.on('pass', function (test) {
            passes++;
            reportContent = reportContent + `<tr><td>${test.fullTitle()}</td><td>Pass</td><td>${test.duration} ms</td></tr>`;
            console.log('pass: %s', test.fullTitle());
        });

        runner.on('fail', function (test, err) {
            failures++;
            reportContent = reportContent + `<tr><td>${test.fullTitle()}</td><td><a href='#" background-color='red' onclick='showPopUp("dialog",\`` + `${err.message}` + `\`)'><font color='red'>Fail</font></button></td><td>${test.duration} ms</td></tr>`;
            console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
        });

        runner.on('end', function () {
            reportContent = reportContent + '</table></body></html>';
            let fs = require('fs');
            console.log(reportContent)
            fs.writeFileSync("testreport.html", reportContent)
            console.log('end: %d/%d', passes, passes + failures);
        });
    }

    return report;
}


module.exports = SimpleMochaReporter();
