"use client";

import Image from "next/image";

import { asset } from "@/lib/path";

export default function NightScene() {
  const stars = [
    { left: "10%", top: "12%", size: "big", delay: "0s" },
    { left: "22%", top: "18%", size: "small", delay: "1.2s" },
    { left: "36%", top: "15%", size: "small", delay: "2.6s" },
    { left: "48%", top: "20%", size: "big", delay: ".8s" },
    { left: "58%", top: "12%", size: "small", delay: "3s" },
    { left: "72%", top: "20%", size: "small", delay: "1.5s" },
    { left: "84%", top: "10%", size: "big", delay: "2s" },
    { left: "16%", top: "55%", size: "small", delay: "4s" },
    { left: "65%", top: "48%", size: "small", delay: "2.8s" },
  ];

  return (
    <>
      <style>{`
        .scene{
          position:relative;
          width:100%;
          height:100%;
        }

        .viewport{
          position:absolute;
          inset:6.8%;
          overflow:hidden;
          z-index:1;
        }

        .bg{
          position:absolute;
          inset:0;
        }

        .bg img{
          object-fit:cover;
          object-position:center;
        }

        .moon{
          position:absolute;
          right:10%;
          top:10%;
          width:18%;
          z-index:4;
          animation:moonGlow 6s ease-in-out infinite;
        }

        .moon img{
          width:100%;
          height:auto;
        }

        .star{
          position:absolute;
          z-index:3;
          transform-origin:center;
        }

        .star.big{
          width:3.2%;
          animation:twinkleBig 4.5s ease-in-out infinite;
        }

        .star.small{
          width:1.7%;
          animation:twinkleSmall 3s linear infinite;
        }

        .frame{
          position:absolute;
          inset:0;
          z-index:20;
          pointer-events:none;
        }

        @keyframes twinkleBig{

          0%{
            opacity:.15;
            transform:scale(.8);
            filter:drop-shadow(0 0 0px white);
          }

          25%{
            opacity:1;
            transform:scale(1.2);
            filter:drop-shadow(0 0 8px rgba(255,255,255,.9));
          }

          50%{
            opacity:.35;
            transform:scale(.95);
          }

          75%{
            opacity:.9;
            transform:scale(1.05);
          }

          100%{
            opacity:.15;
            transform:scale(.8);
          }

        }

        @keyframes twinkleSmall{

          0%{
            opacity:.2;
            transform:scale(.8);
          }

          30%{
            opacity:.7;
            transform:scale(1);
          }

          60%{
            opacity:.35;
          }

          100%{
            opacity:.2;
            transform:scale(.8);
          }

        }

        @keyframes moonGlow{

          0%{
            transform:scale(1);
            filter:drop-shadow(0 0 10px rgba(255,255,255,.25));
          }

          50%{
            transform:scale(1.02);
            filter:drop-shadow(0 0 30px rgba(255,255,255,.55));
          }

          100%{
            transform:scale(1);
            filter:drop-shadow(0 0 10px rgba(255,255,255,.25));
          }

        }

      `}</style>

      <div className="scene">

        <div className="viewport">

          {/* Background */}
          <div className="bg">
            <Image
              src={asset("/scene/night/night.png")}
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Moon */}
          <div className="moon">
            <Image
              src={asset("/scene/night/moon.svg")}
              alt=""
              width={200}
              height={200}
            />
          </div>

          {/* Stars */}
          {stars.map((star, i) => (
            <div
              key={i}
              className={`star ${star.size}`}
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
              }}
            >
              <Image
                src={
                  star.size === "big"
                    ? asset("/scene/night/star-big.svg")
                    : asset("/scene/night/star-small.svg")
                }
                alt=""
                width={48}
                height={48}
              />
            </div>
          ))}

        </div>

        {/* Frame */}
        <div className="frame">
          <Image
            src={asset("/scene/night/frame.svg")}
            alt=""
            fill
            priority
          />
        </div>

      </div>
    </>
  );
}