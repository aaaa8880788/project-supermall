<template>
  <div class="paramsDetail" v-if="Object.keys(paramsInfo).length !== 0">
    <div class="paramsTable">
      <div class="rule" v-if="paramsInfo.rule">
        <h3>尺码说明</h3>
        <table>
          <tr v-for="(rules, index) in paramsInfo.rule" :key="index">
            <td v-for="(rule, index) in rules" :key="index">{{ rule }}</td>
          </tr>
        </table>
        <p>
          ※
          以上尺寸为实物人工测量，因测量当时不同会有1-2cm误差，相关数据仅作参考，以收到实物为准。
        </p>
      </div>
      <div class="info" v-if="paramsInfo.info">
        <h3>参数列表</h3>
        <table>
          <tr v-for="(info, index) in paramsInfo.info" :key="index">
            <td>{{ info.key }}</td>
            <td>{{ info.value }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParamsDetail",
  props: ["paramsInfo"],
};
</script>

<style lang="less" scoped>
.paramsDetail {
  padding: 10px;
  .paramsTable {
    table {
      margin: 10px 0;
      width: 100%;
      text-align: center;
      border-collapse: collapse;
      tr {
        height: 40px;
        border-bottom: 1px solid #ccc;
      }
    }
    .info {
      margin-top: 50px;
      table {
        text-align: left;
        td:first-child {
          width: 30%;
        }
        td:last-child {
          color: var(--color-tint);
          font-weight: bold;
        }
      }
    }
  }
}
</style>