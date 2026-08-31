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
        <div className="elizabeth-board"><span>{quote}</span></div>
        <div className="elizabeth-stick"></div>
        <div className="elizabeth-body"></div>
      </div>
      <style>{`
       .elizabeth-wrapper{position:fixed;bottom:20px;left:0;z-index:9999;width:150px;height:160px;pointer-events:none;animation:walkLoop 30s linear infinite}
        @keyframes walkLoop{0%{transform:translateX(-360px)}50%{transform:translateX(100vw)}100%{transform:translateX(100vw)}}

       .elizabeth-body{position:absolute;bottom:0;left:22px;width:82px;height:146px;background:url('/elizabeth-duck.png') center bottom / contain no-repeat;transform-origin:50% 100%;animation:waddle 0.5s ease-in-out infinite;filter:drop-shadow(2px 4px 3px rgba(0,0,0,0.18))}
        @keyframes waddle{0%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-5px) rotate(4deg)}100%{transform:translateY(0) rotate(-4deg)}}

       .elizabeth-stick{position:absolute;bottom:120px;left:34px;width:5px;height:52px;background:linear-gradient(#b07f45,#8a5a28);border-radius:3px;transform:rotate(-6deg);transform-origin:bottom center;animation:waddle 0.5s ease-in-out infinite;z-index:-1}

       .elizabeth-board{position:absolute;bottom:150px;left:2px;width:150px;background:#fffdf5;border:3px solid #1a1a1a;border-radius:12px;padding:9px 11px;text-align:center;box-shadow:3px 3px 0 #1a1a1a;animation:boardBob 0.5s ease-in-out infinite}
        @keyframes boardBob{0%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-4px) rotate(2deg)}100%{transform:translateY(0) rotate(-2deg)}}
       .elizabeth-board span{font-family:Tajawal,sans-serif;font-size:13px;font-weight:800;line-height:1.4;color:#c0392b}

       @media(max-width:768px){
        .elizabeth-wrapper{bottom:12px;width:124px;height:132px}
        .elizabeth-body{left:18px;width:68px;height:120px}
        .elizabeth-stick{bottom:98px;left:28px;height:44px}
        .elizabeth-board{bottom:124px;left:0;width:124px}
        .elizabeth-board span{font-size:11.5px}
       }
      `}</style>
    </>
  );
}
