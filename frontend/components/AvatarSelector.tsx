"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, X, Check } from "lucide-react";

interface AvatarSelectorProps {
  initialAvatarUrl?: string;
  userName: string;
}

const avatarsList = [
  {
    url: "/images/avatar-girl-1.png",
    gender: "girl",
    label: "Shreya (Laal Paar Saree)",
    description: "Elegant white saree with a deep red border, traditional gold jhumkas, and a red bindi."
  },
  {
    url: "/images/avatar-girl-2.png",
    gender: "girl",
    label: "Pooja (Mustard Anjali)",
    description: "Stylish mustard-yellow saree with black border and gold nose ring, perfect for Anjali morning."
  },
  {
    url: "/images/avatar-girl-3.png",
    gender: "girl",
    label: "Riya (Sandhi Pujo Royal)",
    description: "Exquisite royal blue designer saree with detailed gold embroidery and traditional gold jewelry."
  },
  {
    url: "/images/avatar-girl-4.png",
    gender: "girl",
    label: "Tiyasha (Diyas of Ekadashi)",
    description: "Vibrant orange-pink silk saree with long dark hair, holding a warm glowing clay lamp."
  },
  {
    url: "/images/avatar-girl-5.png",
    gender: "girl",
    label: "Debolina (Sindoor Khela Crimson)",
    description: "Dashami celebration look wearing a crimson red Benarasi silk saree and delicate gold crown."
  },
  {
    url: "/images/avatar-boy-1-beard.png",
    gender: "boy",
    label: "Aniket (Dhak Royal Blue)",
    description: "Handsome look with a neatly trimmed beard, rich royal blue panjabi, and traditional white dhuti."
  },
  {
    url: "/images/avatar-boy-2.png",
    gender: "boy",
    label: "Joy (Raw Silk Classic)",
    description: "Classic clean-shaved look wearing a traditional cream-colored raw silk panjabi and white dhuti."
  },
  {
    url: "/images/avatar-boy-3-beard.png",
    gender: "boy",
    label: "Raj (Dhunuchi Mustard)",
    description: "Festive look with a stylish trimmed beard, mustard panjabi, and holding a clay dhunuchi."
  },
  {
    url: "/images/avatar-boy-4-beard.png",
    gender: "boy",
    label: "Drishyam (Designer Maroon)",
    description: "Elegant evening look with a handsome short beard, modern maroon and black designer panjabi."
  },
  {
    url: "/images/avatar-boy-5.png",
    gender: "boy",
    label: "Sayan (Vijaya Silk White)",
    description: "Dashami look in a rich white silk panjabi with a detailed red and gold embroidered border."
  }
];

export default function AvatarSelector({ initialAvatarUrl, userName }: AvatarSelectorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(
    !initialAvatarUrl || initialAvatarUrl.includes("dicebear.com") || initialAvatarUrl === "/images/avatar-girl.png"
      ? "/images/avatar-girl-1.png"
      : initialAvatarUrl === "/images/avatar-boy.png" || initialAvatarUrl === "/images/avatar-boy-1.png"
      ? "/images/avatar-boy-1-beard.png"
      : initialAvatarUrl === "/images/avatar-boy-3.png"
      ? "/images/avatar-boy-3-beard.png"
      : initialAvatarUrl === "/images/avatar-boy-4.png"
      ? "/images/avatar-boy-4-beard.png"
      : initialAvatarUrl
  );
  const [selectedAvatar, setSelectedAvatar] = useState(
    !initialAvatarUrl || initialAvatarUrl.includes("dicebear.com") || initialAvatarUrl === "/images/avatar-girl.png"
      ? "/images/avatar-girl-1.png"
      : initialAvatarUrl === "/images/avatar-boy.png" || initialAvatarUrl === "/images/avatar-boy-1.png"
      ? "/images/avatar-boy-1-beard.png"
      : initialAvatarUrl === "/images/avatar-boy-3.png"
      ? "/images/avatar-boy-3-beard.png"
      : initialAvatarUrl === "/images/avatar-boy-4.png"
      ? "/images/avatar-boy-4-beard.png"
      : initialAvatarUrl
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: selectedAvatar }),
      });

      if (response.ok) {
        setCurrentAvatar(selectedAvatar);
        setIsOpen(false);
        router.refresh(); // Dynamically re-trigger Server Component fetches to update the page
      } else {
        console.error("Failed to update avatar.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Current Avatar Frame with Edit overlay */}
      <div className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,77,61,0.15)] hover:shadow-[0_0_35px_rgba(255,77,61,0.25)] transition-all duration-300 flex-shrink-0">
        <Image
          src={currentAvatar}
          alt={userName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Click to Edit trigger */}
        <button
          onClick={() => {
            setSelectedAvatar(currentAvatar);
            setIsOpen(true);
          }}
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
          title="Change Pujo Avatar"
        >
          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white text-accent animate-pulse" style={{ color: "var(--accent)" }} />
          <span className="text-[10px] text-white/90 uppercase tracking-widest font-semibold">Change</span>
        </button>
      </div>

      {/* Avatar Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[rgba(255,77,61,0.2)] bg-[#1A0F0D] p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              aria-label="Close selector"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass-accent overflow-hidden p-1.5 shadow-[0_0_15px_rgba(255,77,61,0.15)] border-accent/30 mb-3">
                <Image
                  src="/durga-eyes.jpg"
                  alt="CholooPujoo Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h4
                className="text-xl sm:text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Choose Pujo Avatar
              </h4>
              <p className="text-xs sm:text-sm text-white/50 max-w-sm mx-auto">
                Dress your profile in traditional Durga Pujo attire for the grand celebrations!
              </p>
            </div>

            {/* Selection Grid (Scrollable for 10 avatars) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
              {avatarsList.map((avatar) => {
                const isSelected = selectedAvatar === avatar.url;
                return (
                  <button
                    key={avatar.url}
                    onClick={() => setSelectedAvatar(avatar.url)}
                    className={`glass p-4 rounded-2xl flex flex-col items-center text-center gap-3 transition-all duration-300 border cursor-pointer ${
                      isSelected
                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                        : "border-white/5 hover:border-white/15"
                    }`}
                    style={isSelected ? { borderColor: "var(--accent)" } : {}}
                  >
                    {/* Avatar Image Frame */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white/5 border border-white/10 shadow-md">
                      <Image
                        src={avatar.url}
                        alt={avatar.label}
                        fill
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center border border-white shadow-md" style={{ background: "var(--accent)" }}>
                            <Check className="w-4 h-4 text-white font-bold" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Label & Description */}
                    <div>
                      <h5 className={`text-sm font-bold ${isSelected ? "text-accent" : "text-white"}`} style={isSelected ? { color: "var(--accent)" } : {}}>
                        {avatar.label}
                      </h5>
                      <p className="text-[10px] sm:text-xs text-white/40 mt-1 leading-normal">
                        {avatar.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end border-t border-white/5 pt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
                disabled={isSaving}
              >
                Cancel
              </button>
              
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-95 disabled:opacity-60 flex items-center gap-2 cursor-pointer"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Selection"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
