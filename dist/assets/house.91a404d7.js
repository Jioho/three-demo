import{h as H,R as c,S as J,A as K,G as L,M as s,i as O,e as l,B as R,F as T,f as N,P as f,j as Q,k as U,g as V,W as X,O as Y,l as Z}from"./OrbitControls.bb576157.js";const t={width:window.innerWidth,height:window.innerHeight},o=new H,_=o.load("/house/door/alpha.jpg"),$=o.load("/house/door/ambientOcclusion.jpg"),oo=o.load("/house/door/color.jpg"),eo=o.load("/house/door/height.jpg"),to=o.load("/house/door/metalness.jpg"),so=o.load("/house/door/normal.jpg"),ao=o.load("/house/door/roughness.jpg"),no=o.load("/house/bricks/ambientOcclusion.jpg"),io=o.load("/house/bricks/color.jpg"),ro=o.load("/house/bricks/normal.jpg"),ho=o.load("/house/bricks/roughness.jpg"),S=o.load("/house/grass/ambientOcclusion.jpg"),y=o.load("/house/grass/color.jpg"),z=o.load("/house/grass/normal.jpg"),j=o.load("/house/grass/roughness.jpg");S.repeat.set(6,6);y.repeat.set(6,6);z.repeat.set(6,6);j.repeat.set(6,6);S.wrapS=c;y.wrapS=c;z.wrapS=c;j.wrapS=c;S.wrapT=c;y.wrapT=c;z.wrapT=c;j.wrapT=c;window.addEventListener("resize",()=>{t.width=window.innerWidth,t.height=window.innerHeight,w.aspect=t.width/t.height,w.updateProjectionMatrix(),d.setSize(t.width,t.height),d.setPixelRatio(Math.min(window.devicePixelRatio,2))});const C=document.querySelector(".webgl"),a=new J,co=new K(16777215,.2);a.add(co);const p=new L;a.add(p);const v=new s(new O(20,20),new l({aoMap:S,map:y,normalMap:z,roughnessMap:j}));v.rotation.x=-Math.PI*.5;v.receiveShadow=!0;p.add(v);const b=new s(new R(4,2.4,4),new l({map:io,aoMap:no,normalMap:ro,roughnessMap:ho}));b.geometry.setAttribute("uv2",new T(b.geometry.attributes.uv.array,2));v.receiveShadow=!0;b.position.y=1.2;p.add(b);const P=new s(new N(3.5,1,4),new l({color:"#b35f45"}));P.position.y=2.9;P.rotation.y=Math.PI*.25;p.add(P);const M=new f("#ff7d46",1,7);M.shadow.mapSize.width=256;M.shadow.mapSize.height=256;M.shadow.camera.far=7;M.position.set(0,2.2,2.7);p.add(M);const m=new s(new O(2,2,100,100),new l({map:oo,aoMap:$,alphaMap:_,transparent:!0,displacementMap:eo,displacementScale:.1,normalMap:so,metalnessMap:to,roughnessMap:ao}));m.geometry.setAttribute("uv2",new T(m.geometry.attributes.uv.array,2));m.position.y=1;m.position.z=2.01;p.add(m);const G=new Q(1,16,16),x=new l({color:"#89c854"}),A=new s(G,x),W=new s(G,x),k=new s(G,x),D=new s(G,x);A.scale.set(.5,.5,.5);A.position.set(.8,.2,2.2);W.scale.set(.25,.25,.25);W.position.set(1.4,.1,2.1);k.scale.set(.4,.4,.4);k.position.set(-.8,.1,2.2);D.scale.set(.15,.15,.15);D.position.set(-1,.05,2.6);p.add(A,W,k,D);const F=new L;a.add(F);const po=50,wo=new R(.6,.8,.1),lo=new l({color:"#727272"});for(let e=0;e<=po;e++){const n=new s(wo,lo),g=Math.random()*Math.PI*2,u=3+Math.random()*6,q=Math.cos(g)*u,E=Math.sin(g)*u;n.position.set(q,.3,E),n.rotation.z=(Math.random()-.5)*.4,n.rotation.y=(Math.random()-.5)*.4,n.castShadow=!0,F.add(n)}const go=new U("#262837",1,10);a.fog=go;const i=new f("#ff00ff",3,3);i.castShadow=!0;i.shadow.mapSize.width=256;i.shadow.mapSize.height=256;i.shadow.camera.far=7;a.add(i);const r=new f("#00ffff",3,3);r.castShadow=!0;r.shadow.mapSize.width=256;r.shadow.mapSize.height=256;r.shadow.camera.far=7;a.add(r);const h=new f("#ff7800",3,3);h.castShadow=!0;h.shadow.mapSize.width=256;h.shadow.mapSize.height=256;h.shadow.camera.far=7;a.add(h);const w=new V(75,t.width/t.height,.1,2e3);w.position.set(1,2,6);a.add(w);const d=new X({canvas:C});d.setSize(t.width,t.height);d.setPixelRatio(Math.min(2,window.devicePixelRatio));d.setClearColor("#262837");d.shadowMap.enabled=!0;const B=new Y(w,C);B.enableDamping=!0;const uo=new Z,I=()=>{B.update();const e=uo.getElapsedTime(),n=e*.5;i.position.x=Math.cos(n)*4,i.position.z=Math.sin(n)*4,i.position.y=Math.sin(e*3);const g=-e*.32;r.position.x=Math.cos(g)*5,r.position.z=Math.sin(g)*5,r.position.y=Math.sin(e*4)+Math.sin(e*2.5);const u=-e*.18;h.position.x=Math.cos(u)*(7+Math.sin(e*.32)),h.position.z=Math.sin(u)*(7+Math.sin(e*.5)),h.position.y=Math.sin(e*4)+Math.sin(e*2.5),d.render(a,w),window.requestAnimationFrame(I)};I();
