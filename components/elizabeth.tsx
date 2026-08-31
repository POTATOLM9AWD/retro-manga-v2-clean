"use client";
import { useState, useEffect, useRef } from "react";

const ALL_QUOTES = [
  "اقرأ المانجا، لا تقرأ أفكاري!","إذا جعت كُل","إليزابيث لا تتكلم، تفعل","زورا جاناي، كاتسورا دا!","كاغورا: جائعة دائمًا!","جينتوكي: السكر هو الحياة","شينباتشي: النظارة هي هويتي","ساموراي لا يستسلم أبداً","الحياة مثل جامب","الحب هو ساكي الفراولة","لا تلمس تسريحتي!","إليزابيث تقول:...","الشوجن سينباي، سأعود","إذا تهت، اتبع رائحة الرامن!","لا تثق بقطة تقرأ مانجا","بطّة تمشي ولوحة تحكي!","أنا لست بطة، أنا فكرة!","الجوع يجعلني فيلسوفًا","اضحك، فالمانجا تنتظر!","لا تنم، المانجا لم تنته!","أنا أذكى مما أبدو!","لوحتي أثقل من سيفي!","امشِ ببطء، فالحياة مانجا","هل قرأت الفصل اليوم؟","أنا دليل سياحي في عالم المانجا!","توقف عن التمرير وابدأ القراءة!","أنا بطة لكن قلبي ساموراي!","القراءة تحرق سعرات!"
];

export default function Elizabeth() {
  const [quote, setQuote] = useState(ALL_QUOTES[0]);
  const queueRef = useRef<string[]>([]);
  const getNext = () => {
    if (queueRef.current.length === 0) {
      const sh = [...ALL_QUOTES].sort(() => Math.random() - 0.5);
      queueRef.current = sh;
    }
    return queueRef.current.pop()!;
  };
  useEffect(() => {
    queueRef.current = [...ALL_QUOTES].sort(() => Math.random() - 0.5);
    setQuote(getNext());
    const i = setInterval(() => setQuote(getNext()), 15000);
    return () => clearInterval(i);
  }, []);
  return (
    <>
      <div className="elizabeth-wrapper">
        <div className="elizabeth-body">
          {/* held sign board on a stick */}
          <div className="elizabeth-stick"></div>
          <div className="elizabeth-board"><span>{quote}</span></div>
          {/* face */}
          <div className="eye eye-left"><i className="pupil"></i><i className="lash l1"></i><i className="lash l2"></i></div>
          <div className="eye eye-right"><i className="pupil"></i><i className="lash l1"></i><i className="lash l2"></i></div>
          <div className="beak"><i className="beak-line"></i></div>
          {/* flippers */}
          <div className="flipper flipper-left"></div>
          <div className="flipper flipper-right"></div>
          {/* webbed feet */}
          <div className="foot foot-left"></div>
          <div className="foot foot-right"></div>
        </div>
      </div>
      <style>{`
       .elizabeth-wrapper{position:fixed;bottom:20px;left:0;z-index:9999;width:110px;height:170px;pointer-events:none;animation:walkLoop 30s linear infinite}
        @keyframes walkLoop{0%{transform:translateX(-320px)}50%{transform:translateX(100vw)}100%{transform:translateX(100vw)}}

       .elizabeth-body{width:96px;height:132px;background:radial-gradient(120% 120% at 50% 20%,#ffffff 60%,#f0eee6 100%);border:2px solid #d9d6cc;border-radius:50% 50% 45% 45% / 62% 62% 42% 42%;position:relative;animation:waddle 0.5s ease-in-out infinite;box-shadow:inset 0 -6px 10px rgba(0,0,0,0.05)}
        @keyframes waddle{0%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-5px) rotate(5deg)}100%{transform:translateY(0) rotate(-5deg)}}

       /* eyes */
       .eye{position:absolute;top:26px;width:20px;height:22px;background:#fff;border:2px solid #1a1a1a;border-radius:50%;overflow:visible}
       .eye-left{left:20px}
       .eye-right{right:20px}
       .eye .pupil{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:#111;border-radius:50%}
       .eye .lash{position:absolute;top:-4px;width:2px;height:6px;background:#1a1a1a;border-radius:2px}
       .eye .lash.l1{left:3px;transform:rotate(-20deg)}
       .eye .lash.l2{right:3px;transform:rotate(20deg)}

       /* beak */
       .beak{position:absolute;top:48px;left:50%;transform:translateX(-50%);width:58px;height:26px;background:linear-gradient(#ffcf5c,#f5b400);border:2px solid #d99a00;border-radius:50%}
       .beak .beak-line{position:absolute;top:50%;left:8%;width:84%;height:2px;background:#c98d00;border-radius:2px}

       /* flippers */
       .flipper{position:absolute;top:60px;width:20px;height:48px;background:#f3f1e8;border:2px solid #d9d6cc}
       .flipper-left{left:-10px;border-radius:60% 40% 50% 50%;transform:rotate(12deg)}
       .flipper-right{right:-10px;border-radius:40% 60% 50% 50%;transform:rotate(-45deg);top:44px}

       /* feet */
       .foot{position:absolute;bottom:-9px;width:26px;height:12px;background:#ff9a3c;border:2px solid #e07d1e;border-radius:40% 40% 55% 55%}
       .foot-left{left:14px}
       .foot-right{right:14px}

       /* held sign */
       .elizabeth-stick{position:absolute;top:24px;right:-4px;width:5px;height:70px;background:linear-gradient(#a9773f,#875a2a);border-radius:3px;transform:rotate(-16deg);transform-origin:bottom;z-index:-1}
       .elizabeth-board{position:absolute;bottom:112%;left:50%;transform:translateX(-50%);width:158px;background:#fffdf5;border:2.5px solid #1a1a1a;border-radius:10px;padding:9px 10px;text-align:center;box-shadow:3px 3px 0 #1a1a1a}
       .elizabeth-board span{font-family:Tajawal,sans-serif;font-size:13px;font-weight:800;line-height:1.4;color:#c0392b}

       @media(max-width:768px){
        .elizabeth-wrapper{bottom:12px;width:92px}
        .elizabeth-body{width:78px;height:108px}
        .elizabeth-board{width:132px}
        .elizabeth-board span{font-size:11.5px}
       }
      `}</style>
    </>
  );
}
