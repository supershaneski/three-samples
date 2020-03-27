ShaneLava = (function() {
    var self;

    function ShaneLava(count, scale, color, texture, speed) {
        self = this;

        this.particunt = 0;
        this.count = count;
        var particles = new THREE.Geometry();
        var pMaterial = new THREE.PointsMaterial({
            color: color,
            size: scale,
            map: THREE.ImageUtils.loadTexture(texture),
            //blending: THREE.AdditiveBlending,
            transparent: true
        });

        particles.velocity = [];
        particles.timer = [];
        particles.t = [];
        particles.angle = [];
        particles.theta = [];
        particles.phi = [];
        
        for (var i = 0; i < this.count; i++) {
            var x = 0;
            var y = 0;
            var z = 0;

            particle = new THREE.Vector3(0, 0, 0);
            particles.vertices.push(particle);       
            
            particles.velocity.push(speed * Math.random());
            particles.theta.push(generateNumber(0,10));
            particles.phi.push(generateNumber(0,360));
            
            particles.timer.push(0.01);
            var a = 85 + (i % 10);
            particles.angle.push(a);
            particles.t.push(0);
        
        }
        
        this.particleSystem = new THREE.Points(
            particles,
            pMaterial
        );
        this.particleSystem.position.y = 1.2;
        
        scene.add(this.particleSystem);
        
    }

    ShaneLava.prototype = {

        constructor: ShaneLava,

        update: function() {
            
            for(var i = 0; i < this.particunt; i++) {
                var t = this.particleSystem.geometry.t[i];
                var v = this.particleSystem.geometry.vertices[i];
                
                var radius = this.particleSystem.geometry.velocity[i];
                var theta = this.particleSystem.geometry.theta[i];
                var phi = this.particleSystem.geometry.phi[i];
        
                var vx = radius * Math.sin(theta*Math.PI/180) * Math.sin(phi*Math.PI/180); 
                var vy = radius * Math.cos(theta*Math.PI/180); 
                var vz = radius * Math.sin(theta*Math.PI/180) * Math.cos(phi*Math.PI/180); 
                
                v.x = vx * t;
                v.y = vy * t - (0.5 * 9.81 * t * t);
                v.z = vz * t;
                
                t+=0.02;
        
                if(v.y > 80) {
                    v.y = 0;
                    v.x = 0;
                    v.z = 0;
                    t = 0;
                } else if(v.y < 0) {
                    v.y = 0;
                    v.x = 0;
                    v.z = 0;
                    t = 0;
                }
        
                this.particleSystem.geometry.t[i] = t;
                this.particleSystem.geometry.vertices[i] = v;
            }
        
            this.particunt++;
            this.particunt = (this.particunt > this.count)?this.count:this.particunt;
            this.particleSystem.geometry.verticesNeedUpdate = true;
            
        }
    }

    return ShaneLava;

})();