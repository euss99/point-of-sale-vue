<template>
  <div class="flex justify-between p-1">
    <dt class="font-bold">
      <slot name="label" />
    </dt>
    <dd class="text-gray-900">
      <slot name="amount" />
    </dd>
  </div>
</template>
