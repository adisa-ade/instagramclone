<script setup>
import Container from "./Container.vue"
import Card from "./Card.vue"
</script>
<template>
    <Container>
        <div class="timeline-container">
            <Card/>
            <Card/>
            <Card/>
        </div>
    </Container>
</template>
<style scoped>
.timeline-container{
    display: flex;
    column-gap: 20px;    
    margin: 0 auto;
    padding: 20px 0;
}
</style>