<h1>Weather Application</h1>

<h2>To start work with application, please perform next steps:</h2>
<ol>
  <li>Run <code>npm install</code> in root of project.</li>
  <li>Run <code>gulp prod</code> or <code>gulp</code> in command line. 
    Now the server is running on <a href="http://localhost:8000" title="server">http://localhost:8000</a></li>
  <li>Have fun (:</li>
</ol>

<h2>Latest updates and issues:</h2>
<ol>
  <li>Working version of project - 'build' folder. Development version in 'src' folder.</li>
  <li>Browserify inject. Inspect all 'depends'.</li>
  <li>Working on refresh feature on another branch.</li>
  <li>Look after the changeBg function. Prepared precipitation module to stable work.</li>
  <li>Working on providing of observer pattern as a controller.</li>
  <li>Some markup issues.</li>
  <li>Refactoring a forecast logic.</li>
</ol>

<h3>Gulp tasks:</h3>
<ul>
  <li><code>gulp forceBuild</code> - to build project without eslint and karma (for develop);</li>
  <li><code>gulp test</code> - to run only tests;</li>
  <li><code>gulp uglify</code>;</li>
  <li><code>gulp eslint</code> - to check code style. I use airbnb config.</li>
</ul>