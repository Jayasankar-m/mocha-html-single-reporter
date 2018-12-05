var mocha = require('mocha');

var SimpleMochaReporter = function () {
    var reportContent = `<html><head>
                        <script type="text/javascript">
                            function showPopUp(el,msg) {
                                var cvr = document.getElementById("cover");
                                var dlg = document.getElementById(el);
                                document.getElementById("errormsg").innerText = msg;
                                cvr.style.display = "block";
                                dlg.style.display = "block";
                                dlg.style.overflow = "auto";
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
                              width:800px;  
                              height:500px;   
                              background: white;
                              border-style: block;
                              margin-left:-400px;   
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
                        .button {
                            background-color: rgb(10, 25, 114);
                            border: none;
                            color: white;
                            padding: 10px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 1.1em;
                            margin: 2px 2px;
                        }
                      </style></head><body>
                      <div id="cover" ></div>
                      <div id="dialog" hidden >
                          <br><div align="center" style='overflow-y: auto;'>
                          <table id="mochastyle" style='table-layout:fixed;' border='1'>
                            <th><b>Error Details</b></th>
                            <tr id="errormsg"></tr>
                          </table>
                          </div>
                          <br>
                          <div align="center"><button class='button' align="center" onclick="closePopUp('dialog');">Close</a></div>
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
            var errorMsg = err.message.replace(/\\/g,"\\\\");
            reportContent = reportContent + `<tr><td>${test.fullTitle()}</td><td><a href='#' background-color='red' onclick='showPopUp("dialog",\`` + `${errorMsg}` + `\`)'><font color='red'>Fail</font></button></td><td>${test.duration} ms</td></tr>`;
            console.log('fail: %s', test.fullTitle());
        });

        runner.on('end', function () {
            reportContent = reportContent + '</table></body></html>';
            let fs = require('fs');
            fs.writeFileSync("testreport.html", reportContent)
            console.log('summary: %d/%d', passes, passes + failures);
        });
    }

    return report;
}


module.exports = SimpleMochaReporter();