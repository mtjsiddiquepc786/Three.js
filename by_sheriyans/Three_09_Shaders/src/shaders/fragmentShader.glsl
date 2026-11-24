varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

  void main(){
 
  vec4 textureColor = texture2D(uTexture,vUv);
    
  gl_FragColor  = textureColor;
  }
