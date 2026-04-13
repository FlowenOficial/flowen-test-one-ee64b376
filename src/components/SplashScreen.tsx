import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(() => !sessionStorage.getItem("splash_shown"));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / 1500, 1);
      setProgress(p * 100);
      if (p < 1) requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("splash_shown", "true");
        setTimeout(() => setShow(false), 200);
      }
    };
    requestAnimationFrame(tick);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <h1 className="font-display text-5xl font-bold gradient-text-animated mb-3">Flowen</h1>
          <p className="text-muted-foreground text-sm mb-8">Automação que trabalha por si.</p>
          <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
