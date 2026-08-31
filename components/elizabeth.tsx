"use client";
import { useState, useEffect, useRef } from "react";

const ALL_QUOTES = [
  "اقرأ المانجا، لا تقرأ أفكاري!","إذا جعت كُل","إليزابيث لا تتكلم، تفعل","زورا جاناي، كاتسورا دا!","كاغورا: جائعة دائمًا!","جينتوكي: السكر هو الحياة","شينباتشي: النظارة هي هويتي","ساموراي لا يستسلم أبداً","الحياة مثل جامب","الحب هو ساكي الفراولة","لا تلمس تسريحتي!","إليزابيث تقول:...","الشوجن سينباي، سأعود",
  "إذا تهت، اتبع رائحة الرامن!","لا تثق بقطة تقرأ مانجا","بطّة تمشي ولوحة تحكي!","أنا لست بطة، أنا فكرة!","الجوع يجعلني فيلسوفًا","اضحك، فالمانجا تنتظر!","لا تنم، المانجا لم تنته!","أنا أذكى مما أبدو!","لوحتي أثقل من سيفي!","امشِ ببطء، فالحياة مانجا","هل قرأت الفصل اليوم؟","أنا دليل سياحي في عالم المانجا!","توقف عن التمرير وابدأ القراءة!","أنا بطة لكن قلبي ساموراي!","القراءة تحرق سعرات!",
  "سأصبح ملك القراصنة! - لوفي","أحلام الناس لا تنتهي!","اللحمة هي العدالة!","سأتجاوزك! - ناروتو","لن أهرب ولن أتراجع!","القوة تأتي من القلب! - غوكو","لا تستسلم أبداً!","سأحمي أصدقائي! - إيرين","الحرية غالية! - إيرين","إذا لم تقاتل، لا تفوز!","لا تخف من الفشل! - زورو","الطريق طويل لكننا سنصل!","الصداقة أقوى من أي سيف!","العزيمة تصنع المستحيل!","لا تبكي، ابتسم!","الظلام لا يدوم!","كن كما تريد أن تكون!","البداية صعبة دائمًا!","الثقة تصنع المعجزات!","القلب لا يكذب!","الوفاء أغلى من الذهب!","الحب هو أقوى سلاح!","التدريب لا يكذب!","سأعود أقوى!","الضحك يشفي الروح!","غدًا يوم جديد!","القوة الحقيقية في القلب!","لا أحد يولد قويًا!","السعي أهم من النتيجة!","الوحدة تعلمك القوة!","الألم يصنع الرجال!","ابتسم حتى لو تألمت!","المستحيل كلمة الضعفاء!","الحلم بلا عمل وهم!","العائلة ليست بالدم فقط!","الشجاعة أن تخاف وتكمل!","العدل بلا قوة عاجز!","الخسارة تعلم الفوز!","كن لطيفًا، العالم قاسٍ!","القراءة رحلة بلا تذكرة!","مانجا اليوم تريح الغد!","كل فصل بداية جديدة!"
];

export default function Elizabeth() {
  const [quote, setQuote] = useState(ALL_QUOTES[0]);
  const queueRef = useRef<string[]>([]);
  const getNextQuote = () => {
    if (queueRef.current.length === 0) {
      const shuffled = [...ALL_QUOTES].sort(() => Math.random() - 0.5);
      if (shuffled[0] === quote) shuffled.push(shuffled.shift()!);
      queueRef.current = shuffled;
    }
    return queueRef.current.pop()!;
  };
  useEffect(() => {
    queueRef.current = [...ALL_QUOTES].sort(() => Math.random() - 0.5);
    setQuote(getNextQuote());
    const id = setInterval(() => { setQuote(getNextQuote()); }, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="elizabeth-wrapper">
        <div className="elizabeth-body">
          <div className="elizabeth-board"><span>{quote}</span></div>
          <div className="eye eye-left"></div>
          <div className="eye eye-right"></div>
          <div className="beak"></div>
          <div className="stick"></div>
          <div className="foot-left"></div>
          <div className="foot-right"></div>
        </div>
      </div>
      <style>{`
     .elizabeth-wrapper { position: fixed; bottom: 18px; left: 0; z-index: 9999; width: 120px; height: 200px; pointer-events: none; animation: walkLoop 30s linear infinite; }
      @keyframes walkLoop { 0% { transform: translateX(-350px); } 50% { transform: translateX(110vw); } 100% { transform: translateX(110vw); } }
     .elizabeth-body { width: 95px; height: 145px; position: relative; background: radial-gradient(#FFF,#F2F0E8); border-radius: 50% / 60% 60% 40% 40%; border: 2px solid #E8E6DE; animation: cuteWaddle 0.45s ease-in-out infinite; }
      @keyframes cuteWaddle { 0% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-6px) rotate(8deg); } 100% { transform: translateY(0) rotate(-8deg); } }
     .elizabeth-board { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 12px; width: 165px; min-height: 64px; background: #FFF; border: 2.5px solid #222; border-radius: 12px; box-shadow: 3px 3px 0 #222; display: flex; align-items: center; justify-content: center; padding: 10px 10px; }
     .elizabeth-board span { font-family: Tajawal, sans-serif; font-weight: 700; font-size: 14px; text-align: center; line-height: 1.35; }
     .eye { position: absolute; top: 32px; background: #000; border-radius: 50%; }
     .eye-left { left: 18px; width: 8px; height: 8px; }.eye-right { right: 20px; width: 12px; height: 12px; }
     .beak { position: absolute; top: 52px; left: 50%; transform: translateX(-50%); width: 60px; height: 22px; background: #FFC14D; border: 1.5px solid #E6A800; border-radius: 50%; }
     .stick { position: absolute; top: 78px; left: 50%; width: 4px; height: 38px; background: #8B5A2B; transform: translateX(-50%); }
     .foot-left,.foot-right { position: absolute; bottom: -6px; width: 14px; height: 9px; background: #FF8C42; border-radius: 60%; }
     .foot-left { left: 18px; }.foot-right { right: 18px; }
      @media (max-width: 768px) {.elizabeth-wrapper { bottom: 10px; }.elizabeth-body { width: 72px; height: 112px; }.elizabeth-board { width: 130px; }.elizabeth-board span { font-size: 11.5px; } }
      `}</style>
    </>
  );
}
