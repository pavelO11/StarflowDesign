import React, { useEffect, useRef } from 'react'
import './CursorTrail.scss'

const CursorTrail: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const polyRef = useRef<SVGPolylineElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const poly = polyRef.current!;
    const gradient = gradientRef.current!;
    
    let width = svg.clientWidth;
    let height = svg.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const handleResize = () => {
      width = svg.clientWidth;
      height = svg.clientHeight;
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    };
    window.addEventListener('resize', handleResize);

    let x: number | null = null;
    let y: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const MIN_DIST = 1;
    const MAX_POINTS = 10;
    const points: [number, number][] = [];
    const dist = (x1: number, y1: number, x2: number, y2: number) => 
      Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    const animate = () => {
      requestAnimationFrame(animate);
      if (x === null || y === null) return;
      
      // Добавляем новую точку только если достаточно сдвинулись
      if (points.length === 0 || dist(x, y, points[points.length - 1][0], points[points.length - 1][1]) >= MIN_DIST) {
        points.push([x, y]);
        if (points.length > MAX_POINTS) points.shift();
        
        // Обновляем точки полилинии
        const pathString = points.map(([px, py]) => `${px},${py}`).join(' ');
        poly.setAttribute('points', pathString);
        
        // ОБНОВЛЯЕМ ГРАДИЕНТ - ВАЖНОЕ ИЗМЕНЕНИЕ
        if (points.length > 1) {
          // Начало градиента (прозрачное) - текущая позиция курсора (последняя точка)
          const startPoint = points[points.length - 1];
          // Конец градиента (белый) - самая старая точка (начало хвоста)
          const endPoint = points[0];
          
          gradient.setAttribute('x1', String(startPoint[0]));
          gradient.setAttribute('y1', String(startPoint[1]));
          gradient.setAttribute('x2', String(endPoint[0]));
          gradient.setAttribute('y2', String(endPoint[1]));
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg ref={svgRef} id="svg">
      <defs>
        <linearGradient 
          ref={gradientRef} 
          id="trail-gradient" 
          gradientUnits="userSpaceOnUse"
        >
          {/* Прозрачный в начале (у курсора) */}
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          {/* Белый в конце (у хвоста) */}
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
      </defs>
      <polyline
        ref={polyRef}
        id="polyline"
        stroke="url(#trail-gradient)"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default CursorTrail;