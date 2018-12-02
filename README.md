## mocha-html-single-reporter
A simple reporter for mocha that publishes results as a single html file and can be viewed without a server.
This can be easily integrated with CI system.

## install
```
npm i mocha-html-single-reporter
```

## usage
```
mocha --reporter mocha-single-html-reporter
```
A 'testreport.html' file will get generated which will have the pass/fail details.
Also,gives the details of the error in a popup window on clicking the 'Fail' cases link.

## sample report
![Sample Report](src/sample_report.png)

