<template>
  <div>
    <button id="zoomin">+</button>
    <svg id="tree">
      <!-- preserveAspectRatio="xMinYMin meet"> -->
     <clipPath id="clip"></clipPath>
    </svg>
  </div>
  -------
</template>

<script>
// import { mapGetters } from 'vuex';
// import { mapFields } from 'vuex-map-fields';
import * as d3 from 'd3';

export default {
  name: 'D3',
  props: {
    qroot: Object,
  },
  data() {
    return {
      width: window.innerWidth,
      i: 0,
    };
  },
  methods: {
    addObject(target, obj) {
      return Object.assign(target, obj);
    },

    init(data) {
      // this.reformatdata(data);

      let nodes = d3.hierarchy((data), (d) => d.andOr.children);

      // set the dimensions and margins of the diagram
      const margin = {
        top: 10, right: 15, bottom: 10, left: 100,
      };
      const width = this.width - margin.left - margin.right;
      const height = (nodes.children.length * (width / nodes.children.length))
      - margin.top - margin.bottom;

      console.log(nodes);

      // declares a tree layout and assigns the size
      const treemap = d3.tree()
        .size([width, height]);

      // maps the node data to the tree layout
      nodes = treemap(nodes);
      let x0 = Infinity;
      let x1 = -x0;
      nodes.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const svg = d3.select('#tree')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('viewBox', [0, 0, width, height]);

      // appends a 'group' element to 'svg'
      const g = svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        // root node has depth of zero, leaf nodes have height of zero
        // but it looks better at nodes.height + 1
        .attr('transform', `translate(${nodes.x / (nodes.height + 1)},0)`);

      function zoomed({ transform }) {
        g.attr('transform', transform);
      }

      function dragStart() {
        d3.select(this).raise();
        g.attr('cursor', 'grab');
      }

      function dragDo(e) {
        const { x } = e;
        const { y } = e;
        d3.select(this)
          .attr('x', x)
          .attr('y', y);
      }

      function dragEnd() {
        g.attr('cursor', 'grab');
      }

      function drag() {
        svg.call(d3.drag()
          .on('start', dragStart)
          .on('drag', dragDo)
          .on('end', dragEnd));
      }

      function zoom() {
        svg.call(d3.zoom()
          .extent([[0, 0], [width, height]])
          .scaleExtent([1, 8])
          .on('zoom', zoomed));
      }

      zoom();

      drag();

      function chooseColors(d, tags, color) {
        for (let i = 0; i < tags.length; i += 1) {
          if (d.data.andOr.tag === tags[i]) {
            return color[i];
          }
        }
        return 'black';
      }

      const link = g.append('g')
        .attr('fill', 'none')
        .selectAll('path')
        .data(nodes.links())
        .join('path')
        .attr('stroke', (d) => chooseColors(d.source, ['All', 'Any'], ['red', 'blue']))
        .attr('stroke-width', 2)
        .attr('d', d3.linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x))
        .attr('id', (d, i) => (`path${i + 1}`));

      link
        .append('textPath')
        .attr('x', (d) => (d.target.x - d.source.x) / 2)
        .attr('y', (d) => (d.target.y - d.source.y) / 2)
        .attr('fill', (d) => chooseColors(d.source, ['All', 'Any'], ['red', 'blue']))
        .style('text-anchor', 'middle')
        .attr('href', (d, i) => (`#path${i + 1}`))
        .text((d) => d.source.data.andOr.nl.en);

      // adds each node as a group
      const node = g.append('g')
        .selectAll('g')
        .data(nodes.descendants())
        .join('g')
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      // adds the circle to the node
      node.append('circle')
        .attr('fill', (d) => {
          if (d.parent) { return chooseColors(d.parent, ['All', 'Any'], ['red', 'blue']); }
          return 'black';
        })
        .attr('fill-opacity', 0.5)
        .attr('r', 10);

      // adds the text to the node
      node.append('text')
        .attr('dy', '.35em')
        .attr('y', (d) => (d.children ? -20 : 20))
        .style('text-anchor', 'middle')
        .text((d) => d.data.andOr.nl.en);
    },
  },
  computed: {
    // ...mapFields(['marking', 'anyallform', 'formTitle']),
    // ...mapGetters(['qrootExample1']),
  },
  components: {
    // Q,
    // HelloWorld,
  },
  mounted() {
    this.init(this.qroot);
  },
};
</script>
<style scoped>
  svg#tree {
    width: 100vw;
    height: auto;
  }
</style>
