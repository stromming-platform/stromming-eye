<script lang="ts">
  import VideoPlayer from 'svelte-video-player'

  const poster = 'src/assets/2Head.png'

  const source = 'src/assets/file.mp4'
</script>

<main>
 <div>
   <h1 class="font-bold ">
      Strømming video
    </h1>
   <div>
     <VideoPlayer {poster} {source} width="275" height="175" loop/>
   </div>
 </div>
</main>

<style>

</style>