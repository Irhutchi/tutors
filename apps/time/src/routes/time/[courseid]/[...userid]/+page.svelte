<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { fade } from "svelte/transition";
  import { writable, type Writable } from "svelte/store";
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";

  import { currentUser, currentCourse } from "tutors-reader-lib/src/stores/stores";
  import LabTime from "$lib/time/LabTime.svelte";
  import InstructorLabTime from "$lib/time/InstructorLabTime.svelte";
  import InstructorCalendarTime from "$lib/time/InstructorCalendarTime.svelte";
  import NavBar from "$lib/navigators/NavBar.svelte";
  import CalendarTime from "$lib/time/CalendarTime.svelte";
  import { authService } from "tutors-reader-lib/src/services/auth-service";
  import { page } from "$app/stores";

  export let data: PageData;
  const storeTab: Writable<string> = writable("Labs");
  let pinBuffer = "";
  let instructorMode = false;

  onMount(async () => {
    window.addEventListener("keydown", keypressInput);
    authService.checkAuth($currentCourse);
  });

  function keypressInput(e: KeyboardEvent) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === data.ignorePin) {
      instructorMode = true;
    }
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css" />
</svelte:head>

<NavBar title="{data.course.lo.title}" subTitle="{$currentUser?.name}" />

<div in:fade="{{ duration: 500 }}" class="bg-base-200 mt-3 ">
  <TabGroup selected="{storeTab}">
    <Tab value="Labs">Labs</Tab>
    <Tab value="LabsChart">Labs Chart</Tab>
    <Tab value="Calendar">Calendar</Tab>
    {#if instructorMode}
      <Tab value="allLabs">Labs All Students</Tab>
      {#if data.course.hasEnrollment()}
        <Tab value="allEnrolledLabs">Labs All Enrolled Students</Tab>
      {/if}
      <Tab value="allLabsChart">Labs All Students - Chart</Tab>
      <Tab value="allCalendar">Calendar All Students</Tab>
    {/if}
  </TabGroup>
  {#if $storeTab === "Labs"}
    <LabTime user="{data.user}" allLabs="{data.allLabs}" chart="{false}" />
  {/if}
  {#if $storeTab === "LabsChart"}
    <LabTime user="{data.user}" allLabs="{data.allLabs}" chart="{true}" />
  {/if}
  {#if $storeTab === "Calendar"}
    <CalendarTime user="{data.user}" calendarData="{data.calendar}" />
  {/if}
  {#if $storeTab === "allLabs"}
    <InstructorLabTime userMap="{data.users}" allLabs="{data.allLabs}" chart="{false}" />
  {/if}
  {#if $storeTab === "allEnrolledLabs"}
    <InstructorLabTime userMap="{data.enrolledUsers}" allLabs="{data.allLabs}" chart="{false}" />
  {/if}
  {#if $storeTab === "allLabsChart"}
    <InstructorLabTime userMap="{data.users}" allLabs="{data.allLabs}" chart="{true}" />
  {/if}
  {#if $storeTab === "allCalendar"}
    <InstructorCalendarTime userMap="{data.users}" calendarData="{data.calendar}" />
  {/if}
</div>
