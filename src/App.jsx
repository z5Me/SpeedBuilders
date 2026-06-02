import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Zap, Trophy, Users, Clock, Eye, Brain, Hammer, Shield,
  ChevronDown, Copy, Check, Video, MessageSquare, ArrowRight, Play, ExternalLink,
  Timer, Target, Activity, Loader2, HardHat, Cpu
} from "lucide-react";

const creeperPattern = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 1, 1, 0,
  0, 1, 1, 0, 0, 1, 1, 0,
  0, 0, 0, 1, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0
];

const getBlockColor = (isBlack, i) => {
  if (isBlack) return "bg-[#111111] border-[#000000]";
  const greens = [
    "bg-[#3CA749] border-[#2A7533]",
    "bg-[#4EBA5B] border-[#378240]",
    "bg-[#2B9238] border-[#1E6627]",
    "bg-[#55C363] border-[#3B8845]",
  ];
  return greens[(i * 13) % 4];
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [simPhase, setSimPhase] = useState("idle"); // idle | countdown | building | done
  const [countdownVal, setCountdownVal] = useState(3);
  const [progress, setProgress] = useState(0);
  const [builtBlocks, setBuiltBlocks] = useState(0);
  const [simStarted, setSimStarted] = useState(false);
  const totalBlocks = 64;

  const handleCopyIP = useCallback(() => {
    navigator.clipboard.writeText("heomc.net");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const resetSim = useCallback(() => {
    setSimPhase("idle");
    setBuiltBlocks(0);
    setProgress(0);
    setCountdownVal(3);
  }, []);

  const startSim = useCallback(() => {
    setSimPhase("countdown");
    setCountdownVal(3);
    setProgress(100);
    setBuiltBlocks(0);
    let c = 3;
    const interval = setInterval(() => {
      c--;
      if (c > 0) {
        setCountdownVal(c);
      } else {
        clearInterval(interval);
        setCountdownVal(0);
        setSimPhase("building");
        // start building animation
        let blocks = 0;
        const buildInterval = setInterval(() => {
          blocks++;
          setBuiltBlocks(blocks);
          setProgress(Math.round((1 - blocks / 64) * 100));
          if (blocks >= 64) {
            clearInterval(buildInterval);
            setProgress(0);
            setTimeout(() => setSimPhase("done"), 500);
          }
        }, 50);
      }
    }, 1000);
  }, []);

  // Scroll and restart simulation
  const handlePlayAgain = useCallback(() => {
    resetSim();
    setTimeout(() => {
      document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        startSim();
      }, 800);
    }, 100);
  }, [resetSim, startSim]);

  const steps = [
    {
      number: "01",
      title: "QUAN SÁT",
      subtitle: "Đánh giá thiết kế",
      desc: "Một công trình kiến trúc mẫu hoàn chỉnh sẽ hiện ra trước mắt bạn trong vài giây ngắn ngủi. Hãy tận dụng mọi giây để quét qua cấu trúc và chi tiết nhỏ nhất.",
      icon: Eye,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      title: "GHI NHỚ",
      subtitle: "Khóa thông tin",
      desc: "Ghi nhớ chất liệu block, màu sắc, hướng quay và toạ độ chính xác. Trí nhớ ngắn hạn của bạn là chìa khoá duy nhất để sinh tồn.",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      title: "TÁI TẠO",
      subtitle: "Xây dựng siêu tốc",
      desc: "Thời gian bắt đầu đếm ngược! Đặt từng block chuẩn xác với tốc độ tối đa. Sự hoàn hảo phải đi kèm với tốc độ kinh hoàng.",
      icon: Hammer,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      number: "04",
      title: "SỐNG SÓT",
      subtitle: "Kẻ thắng làm vua",
      desc: "Guardian sẽ quét và chấm điểm. Người chơi có tỷ lệ hoàn thành thấp nhất hoặc chậm nhất sẽ bị tiêu diệt ngay lập tức. Hãy là người cuối cùng đứng vững!",
      icon: Shield,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0b10] text-slate-100 font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-900/20 via-violet-800/15 to-transparent blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-indigo-900/20 to-blue-900/10 blur-[160px]" />
        <div className="absolute top-[50%] left-[40%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-emerald-900/10 to-teal-900/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0b10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white/90">
              heomc<span className="text-purple-400">.net</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopyIP}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold text-slate-300 hover:text-white transition-all"
            >
              IP: <span className="text-purple-300">heomc.net</span>
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-medium mb-8">
            <Sparkles size={14} className="text-purple-400" />
            <span>Minecraft Minigame hàng đầu Việt Nam</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 leading-[0.9]">
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-500 bg-clip-text text-transparent">
              SPEED
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              BUILDERS
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Đấu trường xây dựng siêu tốc nơi trí nhớ, tốc độ và sự chính xác là vũ khí tối thượng.
            Bạn có đủ bản lĩnh để trở thành kiến trúc sư cuối cùng?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all flex items-center gap-3 active:scale-95"
            >
              <Play size={20} className="fill-white" />
              <span>TRẢI NGHIỆM NGAY</span>
            </button>
            <a
              href="https://www.youtube.com/@thichtocdo9034"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-lg border border-white/10 hover:border-white/20 transition-all flex items-center gap-3"
            >
              <ArrowRight size={20} />
              <span>XEM GAMEPLAY</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">Khám phá</span>
          <ChevronDown size={18} className="text-slate-600 animate-bounce" />
        </motion.div>
      </section>

      {/* ===== 2. WHAT IS SPEEDBUILDERS? ===== */}
      <section className="relative py-28 px-6 z-10 border-t border-white/5 bg-[#0c0d15]/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
                Giới thiệu
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                SpeedBuilders là gì?
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                SpeedBuilders là minigame tốc độ cực đỉnh trong thế giới Minecraft. Bạn sẽ được
                thử thách khả năng <span className="text-purple-300 font-semibold">quan sát, ghi nhớ</span> và{" "}
                <span className="text-purple-300 font-semibold">tái tạo</span> lại công trình kiến trúc
                trong thời gian ngắn nhất. Trải qua hàng loạt vòng loại trực tiếp (elimination),
                người chơi bị đào thải dần cho đến khi chỉ còn duy nhất một người chiến thắng!
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Người chơi", value: "1.000+" },
                  { label: "Ván đấu", value: "50.000+" },
                  { label: "Xếp hạng", value: "TOP 100" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className="bg-white/5 rounded-2xl p-4 text-center border border-white/5"
                  >
                    <span className="text-2xl md:text-3xl font-black text-purple-400">{stat.value}</span>
                    <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 rounded-3xl p-8 h-full flex flex-col items-center justify-center overflow-hidden">
                {/* Decorative block grid - Creeper */}
                <div className="grid grid-cols-8 gap-1 w-full max-w-[200px]">
                  {creeperPattern.map((isBlack, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.01 }}
                      className={`aspect-square rounded-[3px] border shadow-[inset_0_0_8px_rgba(0,0,0,0.2)] ${getBlockColor(isBlack, i)}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500 mt-6 font-mono">Công trình mẫu hoàn chỉnh</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 3. GAMEPLAY STEPS ===== */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Cách chơi
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Bốn bước chinh phục SpeedBuilders
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Chỉ cần 4 bước, nhưng chỉ một người duy nhất có thể chiến thắng.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${activeStep === index
                    ? "bg-white/5 border-purple-500/30 shadow-lg shadow-purple-500/5 translate-x-2"
                    : "bg-transparent border-transparent hover:bg-white/[0.02]"
                    }`}
                >
                  <span
                    className={`text-lg font-bold font-mono ${activeStep === index ? "text-purple-400" : "text-slate-700"
                      }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                  <div
                    className={`absolute -right-20 -top-20 w-60 h-60 rounded-full bg-gradient-to-br ${steps[activeStep].gradient} opacity-20 blur-3xl`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${steps[activeStep].gradient} flex items-center justify-center text-white mb-6 shadow-xl shadow-black/40`}
                    >
                      {(() => {
                        const Icon = steps[activeStep].icon;
                        return <Icon size={28} />;
                      })()}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                      BƯỚC {steps[activeStep].number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{steps[activeStep].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. CORE FEATURES ===== */}
      <section className="relative py-28 px-6 z-10 bg-[#0c0d15]/50 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Tính năng
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Cơ chế cốt lõi tạo nên sức hút
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Những yếu tố làm nên sự kịch tính không thể rời mắt của SpeedBuilders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Guardian - Trọng tài AI",
                desc: "Hệ thống Guardian tự động quét công trình và chấm điểm chính xác tới từng block. Không có chỗ cho sự tranh cãi!",
                gradient: "from-purple-500/10 to-indigo-500/5",
                iconColor: "text-purple-400",
              },
              {
                icon: Timer,
                title: "Áp lực thời gian",
                desc: "Đồng hồ đếm ngược giảm dần theo từng vòng, tối đa mức độ căng thẳng khi bạn phải xây nhanh hơn đối thủ.",
                gradient: "from-blue-500/10 to-cyan-500/5",
                iconColor: "text-blue-400",
              },
              {
                icon: Activity,
                title: "Bảng xếp hạng Realtime",
                desc: "Cập nhật kết quả và thứ hạng theo thời gian thực sau mỗi vòng đấu. Biết ngay vị trí của bạn trên đấu trường!",
                gradient: "from-emerald-500/10 to-teal-500/5",
                iconColor: "text-emerald-400",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-2xl p-8 transition-all relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 ${feature.iconColor}`}
                  >
                    <feature.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. BUILD SIMULATOR ===== */}
      <section id="simulator" className="relative py-28 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Mô phỏng
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Trải nghiệm cảm giác speedrun
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Bấm vào nút bên dưới để cảm nhận nhịp độ xây dựng và áp lực thời gian
              trong game thực tế.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => {
              if (simPhase === "idle") {
                setSimStarted(true);
                startSim();
              }
            }}
            viewport={{ once: false }}
            className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              {/* State: COUNTDOWN */}
              {simPhase === "countdown" && (
                <div className="text-center">
                  <motion.div
                    key={countdownVal}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-8xl font-black text-purple-400 mb-4"
                  >
                    {countdownVal}
                  </motion.div>
                  <p className="text-slate-500 text-lg">Chuẩn bị tinh thần...</p>
                </div>
              )}

              {/* State: BUILDING */}
              {simPhase === "building" && (
                <div className="w-full max-w-md mx-auto">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-mono text-slate-500">
                      Đã xây: <span className="text-purple-300 font-bold">{builtBlocks}</span>/{totalBlocks}
                    </span>
                    <span className="text-sm font-mono text-slate-500">
                      Còn lại: <span className="text-amber-400 font-bold">{progress}%</span>
                    </span>
                  </div>

                  <div className="w-full bg-slate-800/50 h-3 rounded-full overflow-hidden mb-8 border border-white/5">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.12, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-amber-500 rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-8 gap-1 max-w-[240px] mx-auto mb-6">
                    {creeperPattern.map((isBlack, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.15, scale: 0.8 }}
                        animate={{
                          opacity: i < builtBlocks ? 1 : 0.15,
                          scale: i < builtBlocks ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.15 }}
                        className={`aspect-square rounded-[3px] border ${i < builtBlocks
                          ? getBlockColor(isBlack, i)
                          : "bg-slate-800/50 border-slate-700/50"
                          }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-semibold">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Đang thi công...</span>
                  </div>
                </div>
              )}

              {/* State: IDLE - Before scroll into view */}
              {simPhase === "idle" && (
                <div className="text-center w-full py-12">
                  <div className="text-slate-500 text-lg mb-4">⏳ Cuộn xuống để bắt đầu mô phỏng</div>
                  <p className="text-slate-600 text-sm">Mô phỏng sẽ tự động kích hoạt khi bạn xem đến phần này</p>
                </div>
              )}

              {/* State: DONE */}
              {simPhase === "done" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                    <Trophy size={40} className="text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-2">HOÀN THÀNH! 🎉</h3>
                  <p className="text-slate-400 mb-2">
                    Bạn vừa xây <span className="text-purple-300 font-bold">64/64 block</span> trong thời gian kỷ lục!
                  </p>
                  <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                    Hãy tưởng tượng bạn phải làm điều này dưới áp lực đào thải
                    trực tiếp từ các đối thủ khác. Đó chính là SpeedBuilders!
                  </p>
                  <button
                    onClick={handlePlayAgain}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <Play size={16} className="fill-white" />
                    <span>Chơi lại</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 6. LEADERBOARD PREVIEW ===== */}
      <section className="relative py-28 px-6 z-10 bg-[#0c0d15]/50 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Bảng xếp hạng
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Ai là người xây nhanh nhất?
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Hàng trăm kiến trúc sư đang cạnh tranh vị trí dẫn đầu mỗi ngày. Liệu bạn
              có thể vươn lên top 1?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950/40 border border-white/5 rounded-3xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between text-sm text-slate-500">
              <span className="font-semibold text-purple-300">🏆 Bảng xếp hạng tuần này</span>
              <span className="text-xs">Cập nhật: liên tục</span>
            </div>

            {[
              { rank: "#1", name: "❄️ Frost_Walker", score: "98.7%", time: "12.3s", wins: 142 },
              { rank: "#2", name: "🔥 Lava_Runner", score: "97.2%", time: "13.1s", wins: 98 },
              { rank: "#3", name: "⚡ Storm_Builder", score: "95.8%", time: "13.8s", wins: 76 },
              { rank: "#4", name: "🌀 Wind_Crafter", score: "94.1%", time: "14.2s", wins: 54 },
              { rank: "#5", name: "🌿 Echo_Arch", score: "92.6%", time: "15.0s", wins: 38 },
            ].map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold text-sm w-8 ${i === 0
                      ? "text-amber-400"
                      : i === 1
                        ? "text-slate-300"
                        : i === 2
                          ? "text-amber-600"
                          : "text-slate-600"
                      }`}
                  >
                    {entry.rank}
                  </span>
                  <span className="text-white font-semibold text-sm">{entry.name}</span>
                </div>
                <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
                  <span>Độ chính xác: <span className="text-purple-300">{entry.score}</span></span>
                  <span>Thời gian: <span className="text-amber-400">{entry.time}</span></span>
                  <span className="hidden md:inline">🏆 {entry.wins}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 7. JOIN SERVER CTA ===== */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden border border-purple-500/20 bg-gradient-to-br from-[#0c0d1b] to-[#120f26] p-8 md:p-16 text-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/10 blur-[80px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                Kết nối ngay
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                Tham gia máy chủ chính thức
              </h2>
              <p className="text-slate-400 mb-10 max-w-sm mx-auto">
                Mở Minecraft, thêm máy chủ và bắt đầu cuộc đua xây dựng ngay hôm nay!
              </p>

              <div
                onClick={handleCopyIP}
                className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-black/40 border border-white/10 hover:border-purple-500/30 px-8 py-5 rounded-2xl cursor-pointer group active:scale-95 transition-all mb-8 w-full max-w-md mx-auto"
              >
                <div className="text-center sm:text-left flex-1">
                  <span className="text-xs uppercase text-slate-600 block mb-1">Click để copy IP</span>
                  <span className="text-3xl font-black text-white group-hover:text-purple-300 transition-colors tracking-wide">
                    heomc.net
                  </span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all">
                  {copied ? (
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <Check size={16} /> ĐÃ COPY
                    </span>
                  ) : (
                    <Copy size={20} className="text-slate-400 group-hover:text-white" />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-400">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5">
                  🎮 1.21+
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5">
                  🌍 Java & Bedrock
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 8. GAME MODES ===== */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Chế độ chơi
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Đa dạng thể loại thử thách
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Từ chế độ cơ bản đến các thách thức cực đoan, có gì đó cho mọi cấp độ kỹ năng.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Speed Run",
                desc: "Xây nhanh nhất có thể trong 30 giây. Chính xác và tốc độ là chìa khóa.",
                stats: "Max 64 blocks",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: Shield,
                title: "Survival Mode",
                desc: "Vòng loại trực tiếp: người chậm nhất bị loại. Một người thắng cuối cùng!",
                stats: "Nhiều vòng",
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: Trophy,
                title: "Master Challenge",
                desc: "Công trình phức tạp với chi tiết cực kỳ khó. Chỉ dành cho cao thủ.",
                stats: "128+ blocks",
                gradient: "from-purple-500 to-indigo-500",
              },
              {
                icon: Users,
                title: "Team Battle",
                desc: "Tham gia đội và cạnh tranh với các đội khác. Hợp tác để chiến thắng.",
                stats: "4 người/đội",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: Activity,
                title: "Ranked League",
                desc: "Hệ thống xếp hạng cạnh tranh. Leo lên từ Bronze đến Diamond.",
                stats: "6 hạng",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: Clock,
                title: "Time Trial",
                desc: "Xây công trình tương tự lần lượt. Người nhanh nhất trong thời gian sẽ thắng.",
                stats: "Thời gian không giới hạn",
                gradient: "from-fuchsia-500 to-rose-500",
              },
            ].map((mode, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all overflow-hidden group"
              >
                <div
                  className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mode.gradient} flex items-center justify-center mb-4 shadow-lg shadow-black/40`}
                  >
                    <mode.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{mode.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{mode.desc}</p>
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-xs font-semibold text-purple-300">{mode.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. STATISTICS ===== */}
      <section className="relative py-28 px-6 z-10 bg-[#0c0d15]/50 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Thống kê
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Con số nói lên sức hút
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "1M+", label: "Người chơi toàn cầu", icon: Users },
              { number: "500M+", label: "Ván đấu đã diễn ra", icon: Activity },
              { number: "99.8%", label: "Độ chính xác Guardian AI", icon: Cpu },
              { number: "24/7", label: "Máy chủ hoạt động", icon: Clock },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-slate-950/40 border border-white/10 group-hover:border-purple-500/30 rounded-2xl p-8 text-center transition-all">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                    className="mb-4 flex justify-center"
                  >
                    <stat.icon size={28} className="text-purple-400" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="text-3xl md:text-4xl font-black text-white mb-2"
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. REWARDS & ACHIEVEMENTS ===== */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Phần thưởng
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Hệ thống phần thưởng hấp dẫn
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Nhận badge, skin độc quyền và nhiều phần thưởng khác khi bạn tiến bộ.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Daily Rewards",
                desc: "Nhận xu và điểm mỗi ngày bạn chơi. Streak dài nhất = phần thưởng cao nhất!",
                icon: "🎁",
              },
              {
                title: "Achievement Badges",
                desc: "Mở khóa 50+ badge độc quyền bằng cách hoàn thành các thử thách đặc biệt.",
                icon: "🏅",
              },
              {
                title: "Battle Pass",
                desc: "Mua Battle Pass để mở khóa skin Minecraft và cosmetic độc quyền mỗi mùa.",
                icon: "🎫",
              },
            ].map((reward, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{reward.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{reward.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{reward.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. FAQ ===== */}
      <section className="relative py-28 px-6 z-10 bg-[#0c0d15]/50 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Câu hỏi thường gặp
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Những câu hỏi phổ biến
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Làm thế nào để tham gia SpeedBuilders?",
                a: "Chỉ cần thêm server heomc.net vào danh sách server của bạn trong Minecraft. Sau đó, kết nối và bắt đầu chơi ngay!",
              },
              {
                q: "SpeedBuilders có miễn phí không?",
                a: "Có! Game hoàn toàn miễn phí. Bạn có thể mua Battle Pass tùy chọn để mở khóa nội dung độc quyền.",
              },
              {
                q: "Phiên bản Minecraft nào được hỗ trợ?",
                a: "SpeedBuilders hỗ trợ Java Edition từ 1.21+ và Bedrock Edition trên tất cả nền tảng.",
              },
              {
                q: "Có hỗ trợ cho người mới bắt đầu không?",
                a: "Hoàn toàn! Chúng tôi có chế độ Hướng dẫn với các bài học chi tiết và công trình dễ dàng.",
              },
              {
                q: "Làm thế nào để báo cáo lỗi hoặc gian lận?",
                a: "Truy cập Discord của chúng tôi và sử dụng lệnh /report hoặc liên hệ với quản trị viên.",
              },
              {
                q: "Có giải đấu nào không?",
                a: "Có! Chúng tôi tổ chức giải đấu hàng tuần với tiền thưởng thực tế cho những người chiến thắng.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-slate-950/40 border border-white/10 hover:border-white/20 rounded-xl p-6 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                      <span className="text-purple-400 font-bold text-sm">?</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                      {item.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 12. COMMUNITY HIGHLIGHTS ===== */}
      <section className="relative py-28 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-400 font-semibold uppercase tracking-widest text-sm mb-4 block">
              Cộng đồng
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Những khoảnh khắc huyền thoại
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Những trận đấu đáng nhớ từ cộng đồng SpeedBuilders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { user: "⚡ Thunder_Pro", achievement: "Xây 64 blocks trong 8.2 giây", date: "2 ngày trước" },
              { user: "🔥 BlazeMaster", achievement: "25 chiến thắng liên tiếp", date: "1 tuần trước" },
              { user: "❄️ FrostKing", achievement: "Đạt Diamond Rank lần đầu", date: "3 ngày trước" },
              { user: "💎 DiamondElite", achievement: "100% Perfect builds trong 10 ván", date: "4 ngày trước" },
              { user: "🌟 StarBuilder", achievement: "Mở khóa 50+ badges cộng đồng", date: "1 tuần trước" },
              { user: "🏆 ChampionXXX", achievement: "Giành chiến thắng giải đấu hàng tuần", date: "2 ngày trước" },
            ].map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-white/10 hover:border-purple-500/30 rounded-xl p-6 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-purple-300 font-bold">{highlight.user}</h4>
                  <span className="text-xs text-slate-500">{highlight.date}</span>
                </div>
                <p className="text-slate-300 text-sm">{highlight.achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. FINAL CTA ===== */}
      <section className="relative py-28 px-6 z-10 bg-[#0c0d15]/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-emerald-900/10 p-12 md:p-16 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-emerald-400/5 blur-[80px]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Sẵn sàng chinh phục ngôi vương?
              </h2>
              <p className="text-slate-300 mb-10 max-w-md mx-auto text-lg">
                Tham gia hàng triệu người chơi và trở thành kiến trúc sư tốt nhất trong SpeedBuilders!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyIP}
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center gap-2"
                >
                  <Copy size={20} />
                  <span>COPY IP & CHƠI NGAY</span>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://discord.gg/MAUnzMWsPQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/20 hover:border-white/40 transition-all flex items-center gap-2"
                >
                  <MessageSquare size={20} />
                  <span>THAM GIA DISCORD</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 14. MEDIA CHANNELS ===== */}
      <section className="relative py-20 px-6 z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              href="https://discord.gg/MAUnzMWsPQ"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="flex items-center gap-5 bg-slate-950/40 border border-white/5 hover:border-blue-500/20 hover:bg-slate-950/60 p-6 rounded-2xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <MessageSquare size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2 text-sm">
                  Cộng đồng Discord <ExternalLink size={12} />
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">Giao lưu cùng hàng nghìn người chơi SpeedBuilders</p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@thichtocdo9034"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="flex items-center gap-5 bg-slate-950/40 border border-white/5 hover:border-red-500/20 hover:bg-slate-950/60 p-6 rounded-2xl transition-all group"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shrink-0">
                <Video size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-2 text-sm">
                  Kênh YouTube <ExternalLink size={12} />
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">Hướng dẫn, thủ thuật & highlight gameplay</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== 15. FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6 bg-[#04050a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="text-center md:text-left">
            <span className="font-bold text-white text-sm tracking-widest uppercase">SPEEDBUILDERS</span>
            <p className="mt-0.5">© 2026 heomc.net &mdash; Trang quảng bá chính thức</p>
          </div>
          <p className="text-center md:text-right max-w-md leading-relaxed">
            Minecraft là thương hiệu của Mojang Studios. Trang web này hoàn toàn độc lập, không trực thuộc Mojang hay Microsoft.
          </p>
        </div>
      </footer>
    </div>
  );
}