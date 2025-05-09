import { CheckCircle, Info, LoaderCircle, XCircle } from "lucide-react";
import * as motion from "motion/react-client";
export const loadingToast = (message: string) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-2 bg-black/60 backdrop-blur border border-gray-500/50 px-3 py-2 rounded-full select-none shadow"
  >
    <LoaderCircle size={19} className="animate-spin" /> {message}
  </motion.div>
);

export const infoToast = (message: string) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-2 bg-black/60 backdrop-blur border border-gray-500/50 px-3 py-2 rounded-full select-none shadow"
  >
    <Info size={19} className="text-sky-500" /> {message}
  </motion.div>
);

export const successToast = (message: string) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-2 bg-black/60 backdrop-blur border border-gray-500/50 px-3 py-2 rounded-full select-none shadow"
  >
    <CheckCircle size={19} className="text-emerald-500" /> {message}
  </motion.div>
);

export const errorToast = (message: string) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center gap-2 bg-black/60 backdrop-blur border border-gray-500/50 px-3 py-2 rounded-full select-none shadow"
  >
    <XCircle size={19} className="text-rose-500" /> {message}
  </motion.div>
);
