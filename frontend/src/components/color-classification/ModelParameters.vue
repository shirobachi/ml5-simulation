<script setup>
    import ChangeValueModule from './ChangeValueModule.vue';
    import BaseButton from '@/components/BaseButton.vue';

    const emit = defineEmits(['update:modelValue', 'confirmRetrain']);
    const props = defineProps({
        modelValue: {
            required: true,
            type: Object,
        },
        readiness: {
            required: true,
            type: Boolean,
        },
    });
</script>

<template>
    <section class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
        <p>Parameters</p>

        <ChangeValueModule titleName="Epochs" v-model="modelValue.epochs" />
        <ChangeValueModule titleName="Batch size" v-model="modelValue.batchSize" />

        <BaseButton
            @click="emit('confirmRetrain')"
            :disabled="!props.readiness"
            class="col-start-1 row-start-1 w-full disabled:cursor-progress">
            Reteach model
        </BaseButton>
    </section>
</template>
