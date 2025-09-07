import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import starPNG from '../img/star.png';
import '../css/Star.css';

const Star = () => {
  const starContainerRef = useRef(null); 
  
  useEffect(() => {
    const container = starContainerRef.current;
    if (!container) return;
    
    const stars = container.querySelectorAll('.star-wrapper');

    stars.forEach(star => {
      // 별의 초기 위치를 화면에 무작위로 설정합니다.
      gsap.set(star, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
      
      // GSAP.fromTo()를 사용하여 시작과 끝 상태를 모두 정의합니다.
      gsap.fromTo(
        star,
        // 애니메이션 시작 상태 (fromVars)
        { 
          scale: 0, 
          opacity: 0
        },
        // 애니메이션 최종 상태 (toVars)
        {
          duration: Math.random() * 1.5 + 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 1.5,
          scale: 1, 
          opacity: 1
        }
      );
    });

    return () => {
      gsap.killTweensOf(stars);
    };
  }, []);

  return (
    <div className='star-background' ref={starContainerRef}>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className="star-wrapper">
          <img src={starPNG} alt="반짝이는 별" />
        </div>
      ))}
    </div>
  );
};

export default Star;