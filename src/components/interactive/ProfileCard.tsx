import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./ProfileCard.css";

export interface ProfileCardProps {
  avatarUrl: string;
  alternateAvatarUrl?: string;
  avatarAlt?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  alternateAvatarText?: string;
  primaryAvatarText?: string;
  alternateAvatarLabel?: string;
  primaryAvatarLabel?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const ProfileCardComponent = ({
  avatarUrl,
  alternateAvatarUrl,
  avatarAlt,
  iconUrl,
  grainUrl,
  innerGradient = "linear-gradient(145deg, rgba(39, 45, 21, 0.94), rgba(7, 8, 5, 0.98))",
  behindGlowEnabled = true,
  behindGlowColor = "rgba(244, 255, 114, 0.38)",
  behindGlowSize = "48%",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  miniAvatarUrl,
  name = "Ezra Desmond Sutanto",
  title = "Informatics Student · AI & Full-Stack Builder",
  handle = "ezradesmonds",
  status = "Open for internships and work.",
  contactText = "Contact",
  alternateAvatarText = "Pixel",
  primaryAvatarText = "Real",
  alternateAvatarLabel = "Show pixel portrait",
  primaryAvatarLabel = "Show real portrait",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const portraitCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelBufferRef = useRef<HTMLCanvasElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const portraitFrameRef = useRef<number | null>(null);
  const [canTilt, setCanTilt] = useState(false);
  const [alternateMode, setAlternateMode] = useState(false);
  const [isAvatarTransitioning, setIsAvatarTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const displayedAvatar = alternateMode && alternateAvatarUrl ? alternateAvatarUrl : avatarUrl;
  const displayedMiniAvatar = alternateMode && alternateAvatarUrl
    ? alternateAvatarUrl
    : miniAvatarUrl || avatarUrl;

  useEffect(() => {
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateTiltCapability = () => {
      setPrefersReducedMotion(reducedMotion.matches);
      setCanTilt(enableTilt && !reducedMotion.matches && (precisePointer.matches || enableMobileTilt));
    };

    updateTiltCapability();
    precisePointer.addEventListener("change", updateTiltCapability);
    reducedMotion.addEventListener("change", updateTiltCapability);

    return () => {
      precisePointer.removeEventListener("change", updateTiltCapability);
      reducedMotion.removeEventListener("change", updateTiltCapability);
      if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
      if (portraitFrameRef.current !== null) cancelAnimationFrame(portraitFrameRef.current);
    };
  }, [enableMobileTilt, enableTilt]);

  const loadPortrait = useCallback((src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load portrait: ${src}`));
    image.src = src;
  }), []);

  const drawPixelatedPortrait = useCallback((
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    progress: number,
    width: number,
    height: number,
  ) => {
    const buffer = pixelBufferRef.current || document.createElement("canvas");
    pixelBufferRef.current = buffer;

    const minimumColumns = 12;
    const distanceFromMiddle = Math.abs(progress - 0.5) * 2;
    const maximumColumns = Math.max(96, Math.round(width / window.devicePixelRatio));
    const columns = Math.max(
      minimumColumns,
      Math.round(minimumColumns + (maximumColumns - minimumColumns) * Math.pow(distanceFromMiddle, 1.75)),
    );
    const rows = Math.max(1, Math.round(columns * (height / width)));

    buffer.width = columns;
    buffer.height = rows;
    const bufferContext = buffer.getContext("2d");
    if (!bufferContext) return;

    const sourceScale = Math.max(columns / image.naturalWidth, rows / image.naturalHeight);
    const sourceWidth = columns / sourceScale;
    const sourceHeight = rows / sourceScale;
    const sourceX = (image.naturalWidth - sourceWidth) / 2;

    bufferContext.clearRect(0, 0, columns, rows);
    bufferContext.imageSmoothingEnabled = false;
    bufferContext.drawImage(
      image,
      sourceX,
      0,
      sourceWidth,
      sourceHeight,
      0,
      0,
      columns,
      rows,
    );

    context.clearRect(0, 0, width, height);
    context.imageSmoothingEnabled = false;
    context.drawImage(buffer, 0, 0, columns, rows, 0, 0, width, height);
  }, []);

  const setPointerPosition = useCallback((clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
    const rotateX = (0.5 - y) * 6;
    const rotateY = (x - 0.5) * 6;

    wrapper.style.setProperty("--profile-pointer-x", `${(x * 100).toFixed(2)}%`);
    wrapper.style.setProperty("--profile-pointer-y", `${(y * 100).toFixed(2)}%`);
    wrapper.style.setProperty("--profile-rotate-x", `${rotateX.toFixed(2)}deg`);
    wrapper.style.setProperty("--profile-rotate-y", `${rotateY.toFixed(2)}deg`);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const { clientX, clientY } = event;

    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = requestAnimationFrame(() => {
      setPointerPosition(clientX, clientY);
      pointerFrameRef.current = null;
    });
  }, [canTilt, setPointerPosition]);

  const resetPointer = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.setProperty("--profile-pointer-x", "50%");
    wrapper.style.setProperty("--profile-pointer-y", "50%");
    wrapper.style.setProperty("--profile-rotate-x", "0deg");
    wrapper.style.setProperty("--profile-rotate-y", "0deg");
  }, []);

  const handleAction = useCallback(async () => {
    if (alternateAvatarUrl) {
      if (isAvatarTransitioning) return;

      const nextMode = !alternateMode;
      if (prefersReducedMotion) {
        setAlternateMode(nextMode);
        return;
      }

      const canvas = portraitCanvasRef.current;
      if (!canvas) {
        setAlternateMode(nextMode);
        return;
      }

      setIsAvatarTransitioning(true);

      try {
        const [currentImage, nextImage] = await Promise.all([
          loadPortrait(displayedAvatar),
          loadPortrait(nextMode ? alternateAvatarUrl : avatarUrl),
        ]);
        const rect = canvas.getBoundingClientRect();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
        canvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Unable to initialize portrait transition");

        let switched = false;
        const duration = 520;
        const startedAt = performance.now();

        await new Promise<void>((resolve) => {
          const animate = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            if (!switched && progress >= 0.5) {
              switched = true;
              setAlternateMode(nextMode);
            }

            drawPixelatedPortrait(
              context,
              progress < 0.5 ? currentImage : nextImage,
              progress,
              canvas.width,
              canvas.height,
            );

            if (progress < 1) {
              portraitFrameRef.current = requestAnimationFrame(animate);
            } else {
              portraitFrameRef.current = null;
              resolve();
            }
          };

          portraitFrameRef.current = requestAnimationFrame(animate);
        });
      } catch {
        setAlternateMode(nextMode);
      } finally {
        setIsAvatarTransitioning(false);
      }
      return;
    }
    onContactClick?.();
  }, [
    alternateAvatarUrl,
    alternateMode,
    avatarUrl,
    displayedAvatar,
    drawPixelatedPortrait,
    isAvatarTransitioning,
    loadPortrait,
    onContactClick,
    prefersReducedMotion,
  ]);

  const actionText = alternateAvatarUrl
    ? alternateMode ? primaryAvatarText : alternateAvatarText
    : contactText;
  const actionLabel = alternateAvatarUrl
    ? alternateMode ? primaryAvatarLabel : alternateAvatarLabel
    : `Contact ${name}`;

  const style = {
    "--profile-inner-gradient": innerGradient,
    "--profile-behind-glow-color": behindGlowColor,
    "--profile-behind-glow-size": behindGlowSize,
    "--profile-grain": grainUrl ? `url(${grainUrl})` : "none",
  } as React.CSSProperties;

  return (
    <div
      ref={wrapperRef}
      className={`profile-card-wrap ${canTilt ? "profile-card-wrap--tiltable" : ""} ${className}`.trim()}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {behindGlowEnabled ? <div className="profile-card__behind-glow" aria-hidden="true" /> : null}

      <section ref={frameRef} className="profile-card" aria-label={`${name} profile card`}>
        <div className="profile-card__surface" aria-hidden="true" />
        <div className="profile-card__shine" aria-hidden="true" />
        <div className="profile-card__glare" aria-hidden="true" />

        {iconUrl ? (
          <img className="profile-card__mark" src={iconUrl} width="36" height="36" alt="" aria-hidden="true" />
        ) : null}

        <div className="profile-card__heading">
          <span>Builder profile</span>
          <h2>{name}</h2>
          <p>{title}</p>
        </div>

        <div className="profile-card__portrait-stage">
          <img
            className={`profile-card__portrait ${alternateMode ? "profile-card__portrait--pixel" : ""}`}
            src={displayedAvatar}
            alt={avatarAlt || `${name} portrait`}
            width="720"
            height="900"
            decoding="async"
            fetchPriority="high"
          />
          <canvas
            ref={portraitCanvasRef}
            className={`profile-card__pixel-transition ${isAvatarTransitioning ? "profile-card__pixel-transition--active" : ""}`}
            aria-hidden="true"
          />
        </div>

        {showUserInfo ? (
          <div className="profile-card__user-info">
            <div className="profile-card__user">
              <img
                className={alternateMode ? "profile-card__mini-avatar--pixel" : ""}
                src={displayedMiniAvatar}
                alt=""
                width="44"
                height="44"
                aria-hidden="true"
              />
              <div>
                <strong>@{handle}</strong>
                <span>{status}</span>
              </div>
            </div>

            <button
              type="button"
              className="profile-card__action"
              onClick={handleAction}
              aria-label={actionLabel}
              aria-pressed={alternateAvatarUrl ? alternateMode : undefined}
              aria-busy={isAvatarTransitioning || undefined}
              disabled={isAvatarTransitioning}
            >
              {actionText}
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
};

const ProfileCard = memo(ProfileCardComponent);
export default ProfileCard;
