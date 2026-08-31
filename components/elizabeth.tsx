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
          <div className="elizabeth-board"><span>{quote}</span></div>
        </div>
      </div>
      <style>{`
       .elizabeth-wrapper{position:fixed;bottom:20px;left:0;z-index:9999;width:100px;height:150px;pointer-events:none;animation:walkLoop 30s linear infinite}
        @keyframes walkLoop{0%{transform:translateX(-300px)}50%{transform:translateX(100vw)}100%{transform:translateX(100vw)}}
       .elizabeth-body{width:90px;height:130px;background:#fff;border:2px solid #ddd;border-radius:50% / 60% 60% 40% 40%;position:relative;animation:waddle 0.5s ease-in-out infinite}
        @keyframes waddle{0%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-5px) rotate(5deg)}100%{transform:translateY(0) rotate(-5deg)}}
       .elizabeth-board{position:absolute;bottom:105%;left:50%;transform:translateX(-50%);width:150px;background:#fff;border:2px solid #000;border-radius:10px;padding:8px;text-align:center;box-shadow:2px 2px 0 #000}
       .elizabeth-board span{font-size:12px;font-weight:700}
      `}</style>
    </>
  );
}
