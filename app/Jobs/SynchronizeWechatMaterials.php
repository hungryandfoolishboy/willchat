<?php

namespace App\Jobs;

use App\Repositories\MaterialRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SynchronizeWechatMaterials implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * 分页拉取素材数据时时每次f次摘取的数量
     */
    const PAGE_SIZE = 20;

    /**
     * @var string
     */
    private $syncMaterialType;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($syncMaterialType = 'image')
    {
        $this->syncMaterialType = $syncMaterialType;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $materialService = app('wechat')->material;

        $stats = $materialService->stats();

        $totalCount = $stats[$this->syncMaterialType.'_count'];

        $totalPage = $totalCount / self::PAGE_SIZE;

        for ($i = 0; $i < $totalPage; $i++) {
            $materials = $materialService->lists($this->syncMaterialType, $i, self::PAGE_SIZE);

            if ($materials['item_count']) {
                foreach ($materials['item'] as $material) {

                    app(MaterialRepository::class)->updateOrCreate(['media_id' => $material['media_id']], array_merge($material, ['type' => $this->syncMaterialType]));
                }
            }
        }
    }
}
