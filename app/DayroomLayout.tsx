import React from 'react';

const DayroomLayout = () => {
  return (
    // Outer wrapper: Memastikan container selalu berada di tengah layar
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 overflow-hidden">
      
      {/* 
        Inner Container: 
        - aspect-video: Mengunci rasio menjadi 16:9
        - w-full max-w-[1920px]: Maksimal lebar, menyesuaikan layar
        - relative: Agar elemen di dalamnya bisa memakai 'absolute'
      */}
      <div 
        className="relative w-full max-w-[1920px] aspect-video bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url('/path-to-your-image_260510.jpg')` }} // Ganti dengan path gambarmu
      >
        
        {/* Posisi Navbar Utama (Widget di Kanan Atas) */}
        {/* Kita buat absolute agar menempel di pojok kanan atas container */}
        <div className="absolute top-[3%] right-[2%] w-auto z-50">
          <Navbar isStandaloneWidgets={true} /> 
        </div>

        {/* Posisi Sidebar (Kiri) */}
        {/* Diposisikan secara absolut dengan persentase agar ikut mengecil/membesar */}
        <div className="absolute top-[4%] left-[2%] w-[250px] z-50">
          {/* Logo diletakkan di atas sidebar untuk menyamai desain */}
          <div className="mb-8 ml-4">
            <h1 className="text-3xl font-black tracking-wider text-black font-sans leading-none">
              Desk Scape
            </h1>
            <p className="text-sm font-medium text-gray-800 tracking-wide mt-1">
              your cozy calendar
            </p>
          </div>
          
          <Sidebar />
        </div>

      </div>
    </div>
  );
};

export default DayroomLayout;