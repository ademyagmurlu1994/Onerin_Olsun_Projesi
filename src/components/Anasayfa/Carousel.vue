
<template>
    <div class="row">
        <div id="demo" class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
                <li data-target="#demo" data-slide-to="3"></li>
                <li data-target="#demo" data-slide-to="4"></li>
            </ul>
            
            <!-- The slideshow -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="..\..\..\public\images\slider\slide1.jpg"  alt="Los Angeles">
                </div>
                <div class="carousel-item ">
                <img src="..\..\..\public\images\slider\slide2.jpg" alt="Chicago">
                </div>
                <div class="carousel-item ">
                <img src="..\..\..\public\images\slider\slide3.jpg" alt="New York">
                </div>
                <div class="carousel-item ">
                <img src="..\..\..\public\images\slider\slide4.jpg" alt="Chicagodd">
                </div>
                <div class="carousel-item ">
                <img src="..\..\..\public\images\slider\slide5.jpg" alt="Chicagodd">
                </div>
            </div>
            
            <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    </div>
</template>
<style scoped>
    #demo{
        width:700px;
        height:393px;
    }
    .carousel-inner .carousel-item img{
        width:700px;
        height:393px;
    }
</style>



