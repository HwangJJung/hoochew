'use strict';

angular.module('angularFullstackApp')
  .controller('WebglCtrl', function ($scope) {

    var gl;
    var canvas;
    var shaderProgram;
    var vertexBuffer;

    function createGLContext(canvas) {
      var names= ["webgl", "experimental-webgl"];
      var context = null;
      for(var i=0; i < names.length; i++) {
        try {
          context = canvas.getContext(names[i]);
        } catch (e) {}
        if (context) {
          break;
        }
      }
      if (context) {
        context.viewportWidth = canvas.width;
        context.viewportHeight = canvas.height;
      } else {
        alert("Failed to create WebGL context!");
      }
      return context;
    }

    function loadShader(type, shaderSource) {
     var shader = gl.createShader(type);
      gl.shaderSource(shader,shaderSource);
      gl.compileShader(shader);

      if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader" + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function setupShaders() {
      var vertexShaderSource =
        " attribute vec3 aVertexPosition; \n" +
        "void main() { \n" +
        " gl_Position = vec4(aVertexPosition, 1.0); \n" +
        "} \n";


      var fragmentShaderSource =
        "precision mediump float; \n" +
        "void main() { \n" +
        " gl_FragColor = vec4(1.0,1.0,1.0,1.0); \n" +
        "} \n";

      var vertexShader = loadShader(gl.VERTEX_SHADER,vertexShaderSource);
      var fragmentShader = loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

      shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Failed to setup shaders");
      }

      gl.useProgram(shaderProgram);

      shaderProgram.vertexPositionAttribute =
        gl.getAttribLocation(shaderProgram, "aVertexPosition");

    }

    function setupBuffers() {
      vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      var triangleVertices = [
        0.0, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
      ];

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      vertexBuffer.itemSize = 3;
      vertexBuffer.numberOfItems = 3;
    }

    function draw() {
      gl.viewport(0,0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

      gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
    }

    function startup() {
      canvas = document.getElementById("myGLCanvas");
      gl = createGLContext(canvas);
      setupShaders();
      setupBuffers();
      gl.clearColor(0.0,0.0,0.0,1.0);
      draw();
    }

    $scope.message = 'Hello';
    $scope.startup = startup;
  });
