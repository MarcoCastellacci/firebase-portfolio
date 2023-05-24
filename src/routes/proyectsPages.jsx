import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/pagesStyle.css";

// import required modules
import { Autoplay, Parallax, Pagination, Navigation } from "swiper";

export default function ProyectsPages({title, url, imageUrl, description, }) {

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                speed={600}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="title" data-swiper-parallax="-300">
                        {title}
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                        <p>
                            {description}
                        </p>
                        <div className="img-carrousel">
                            <img src={imageUrl} alt={title} />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
