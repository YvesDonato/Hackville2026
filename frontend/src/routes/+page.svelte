<script lang="ts">
	import { goto } from '$app/navigation';
	import LogoText from '$lib/components/LogoText.svelte';
	import LogoMascot from '$lib/components/LogoMascot.svelte';
</script>

<div class="flex min-h-screen items-center justify-center">
  <div class="flex flex-col mr-4">
    <LogoText />
    <button
      class="text-2xl text-center font-medium w-70 mt-7 mb-4 p-3 drop-shadow-xl rounded-full bg-lblue"
      onclick={() => goto('/lab')}
    >
      Sign Up Now -->
    </button>
    <div class="flex flex-row items-center"> 
      <p class="font-medium text-2xl"> Already have an account?</p> 
      <div class="flex flex-col items-start">
        <a class="text-mblue text-2xl ml-4">Log in</a>
        <span class="ml-4 mt-1 h-0.5 w-16 bg-mblue"></span>
      </div>
    </div>
  </div>
    <LogoMascot />
</div>
